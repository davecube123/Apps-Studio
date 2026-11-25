package studio.apps.stride;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.AudioFocusRequest;
import android.media.AudioManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.os.SystemClock;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.util.Locale;

/**
 * Voice cues that duck other audio: before speaking it asks for transient audio focus with "may duck",
 * so Spotify and other players lower their volume for the cue and come back up afterwards (music keeps playing).
 */
@CapacitorPlugin(name = "Speak")
public class SpeakPlugin extends Plugin {
    private TextToSpeech tts;
    private boolean ready = false;
    private String pending = null;
    private AudioManager am;
    private AudioFocusRequest focusReq;
    private final Handler main = new Handler(Looper.getMainLooper());
    private final AudioManager.OnAudioFocusChangeListener focusListener = change -> { };
    private final AudioAttributes attrs = new AudioAttributes.Builder()
            .setUsage(AudioAttributes.USAGE_ASSISTANCE_NAVIGATION_GUIDANCE)
            .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
            .build();

    @Override
    public void load() {
        am = (AudioManager) getContext().getSystemService(Context.AUDIO_SERVICE);
        tts = new TextToSpeech(getContext(), status -> {
            ready = status == TextToSpeech.SUCCESS;
            if (!ready) return;
            tts.setAudioAttributes(attrs);
            if (tts.setLanguage(Locale.UK) < 0) tts.setLanguage(Locale.getDefault());
            tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                @Override public void onStart(String id) { }
                @Override public void onDone(String id) { releaseFocus(); }
                @Override public void onError(String id) { releaseFocus(); }
                @Override public void onStop(String id, boolean interrupted) { releaseFocus(); }
            });
            if (pending != null) { say(pending); pending = null; }
        });
    }

    private void requestFocus() {
        if (am == null) return;
        if (Build.VERSION.SDK_INT >= 26) {
            focusReq = new AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
                    .setAudioAttributes(attrs)
                    .setOnAudioFocusChangeListener(focusListener)
                    .build();
            am.requestAudioFocus(focusReq);
        } else {
            am.requestAudioFocus(focusListener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK);
        }
    }

    private void releaseFocus() {
        // a short pause so back-to-back cues don't make the music bounce up and down
        main.postDelayed(() -> {
            if (tts != null && tts.isSpeaking()) return;
            if (am == null) return;
            if (Build.VERSION.SDK_INT >= 26) { if (focusReq != null) am.abandonAudioFocusRequest(focusReq); }
            else am.abandonAudioFocus(focusListener);
        }, 300);
    }

    private void say(String text) {
        requestFocus();
        tts.speak(text, TextToSpeech.QUEUE_FLUSH, new Bundle(), "stride-" + SystemClock.elapsedRealtime());
    }

    @PluginMethod
    public void speak(PluginCall call) {
        String text = call.getString("text", "");
        if (text == null || text.isEmpty()) { call.resolve(); return; }
        if (!ready) pending = text; else say(text);
        call.resolve();
    }

    @Override
    protected void handleOnDestroy() {
        if (tts != null) { tts.stop(); tts.shutdown(); }
    }
}
