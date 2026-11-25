package studio.apps.stride;

import android.content.Context;
import android.media.AudioAttributes;
import android.os.Build;
import android.os.VibrationAttributes;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;
import com.getcapacitor.JSArray;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Plays a vibration pattern ([on, off, on, ...] in ms, like navigator.vibrate) with alarm priority,
 * so workout cues are felt with the screen locked and the phone on silent.
 */
@CapacitorPlugin(name = "Buzz")
public class BuzzPlugin extends Plugin {
    @PluginMethod
    public void pattern(PluginCall call) {
        try {
            JSArray arr = call.getArray("pattern");
            if (arr == null || arr.length() == 0) { call.resolve(); return; }
            long[] t = new long[arr.length() + 1];
            t[0] = 0; // Android patterns start with an "off" duration
            for (int i = 0; i < arr.length(); i++) t[i + 1] = Math.max(0, Math.min(5000, arr.getLong(i)));

            Vibrator v;
            if (Build.VERSION.SDK_INT >= 31) {
                VibratorManager vm = (VibratorManager) getContext().getSystemService(Context.VIBRATOR_MANAGER_SERVICE);
                v = vm != null ? vm.getDefaultVibrator() : null;
            } else {
                v = (Vibrator) getContext().getSystemService(Context.VIBRATOR_SERVICE);
            }
            if (v == null || !v.hasVibrator()) { call.resolve(); return; }

            if (Build.VERSION.SDK_INT >= 33) {
                v.vibrate(VibrationEffect.createWaveform(t, -1), VibrationAttributes.createForUsage(VibrationAttributes.USAGE_ALARM));
            } else if (Build.VERSION.SDK_INT >= 26) {
                v.vibrate(VibrationEffect.createWaveform(t, -1), new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_ALARM).build());
            } else {
                v.vibrate(t, -1);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Vibration failed: " + e.getMessage());
        }
    }
}
