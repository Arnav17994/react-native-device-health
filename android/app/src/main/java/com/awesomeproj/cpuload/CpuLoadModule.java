package com.awesomeproj.cpuload;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Callback;

import java.util.HashMap;
import java.util.Map;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class CpuLoadModule extends ReactContextBaseJavaModule {
    public static final String REACT_CLASS = "CpuLoad";
    public static final String CPU_STATE = "percentageCpuUtilization";
    private static ReactApplicationContext reactContext = null;
    long total = 0;
    long idle = 0;
    float usage = 0;


    public CpuLoadModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("EXAMPLE_CONSTANT", "example");

        return constants;
    }

    private WritableNativeMap readUsage()
    {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream("/proc/stat")), 1000);
            String load = reader.readLine();
            reader.close();

            String[] toks = load.split(" ");

            long currTotal = Long.parseLong(toks[2]) + Long.parseLong(toks[3]) + Long.parseLong(toks[4]);
            long currIdle = Long.parseLong(toks[5]);

            this.usage = (currTotal - total) * 100.0f / (currTotal - total + currIdle - idle);
            this.total = currTotal;
            this.idle = currIdle;
        }
        catch(IOException ex)
        {
            ex.printStackTrace();
        }

        WritableNativeMap params = new WritableNativeMap();
        params.putDouble(CPU_STATE, this.usage);
        return params;
    }

    @ReactMethod
    public void updateCpuLoad (final Callback cb) {
        WritableNativeMap params;
        params = readUsage();
        cb.invoke(params);
    }
}
