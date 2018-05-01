package com.awesomeproj.memorymanager;

import android.app.ActivityManager;
import android.app.ActivityManager.MemoryInfo;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Callback;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import javax.annotation.Nullable;
import java.util.HashMap;
import java.util.Map;

public class MemoryManagerModule extends ReactContextBaseJavaModule {

    public MemoryManagerModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    public static final String REACT_CLASS = "MemoryManager";
    public static final String MEM_STATE = "occupiedRAM";
    private static ReactApplicationContext reactContext = null;


    @Override
    public String getName() {
        return "MemoryManager";
    }

    private WritableNativeMap getOccupiedMemory (ReactApplicationContext reactApplicationContext) {

        ActivityManager am = (ActivityManager)reactApplicationContext.getSystemService(ReactApplicationContext.ACTIVITY_SERVICE);
        MemoryInfo mi = new MemoryInfo();

        am.getMemoryInfo(mi);

        double availableMegs = mi.availMem / 1048576L;
        double totalMegs = mi.totalMem / 1048576L;
        double occupiedMegs = ((totalMegs - availableMegs)/totalMegs)*100;
        WritableNativeMap params = new WritableNativeMap();
        params.putDouble(MEM_STATE, occupiedMegs);
        return params;
    }

    @ReactMethod
    public void updateMemoryUsage(final Callback cb)   {
        ReactApplicationContext reactApplicationContext = getReactApplicationContext();
        WritableNativeMap params;
        params = getOccupiedMemory(reactApplicationContext);
        cb.invoke(params);
    }
}