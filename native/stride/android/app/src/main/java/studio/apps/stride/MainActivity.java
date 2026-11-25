package studio.apps.stride;

import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    // Keep the web code running with the screen off, so workout steps, splits and voice cues stay on time.
    // GPS itself comes from the background-geolocation foreground service.
    private void keepRunning() {
        if (getBridge() == null) return;
        WebView w = getBridge().getWebView();
        if (w != null) { w.onResume(); w.resumeTimers(); }
    }

    @Override
    public void onPause() { super.onPause(); keepRunning(); }

    @Override
    public void onStop() { super.onStop(); keepRunning(); }
}
