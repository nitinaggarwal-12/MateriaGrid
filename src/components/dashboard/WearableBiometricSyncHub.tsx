'use client';

import React, { useState } from 'react';
import {
  Watch,
  Activity,
  Heart,
  Flame,
  Moon,
  Smartphone,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface WearableDeviceStream {
  id: string;
  brand: 'APPLE_HEALTH' | 'FITBIT_GOOGLE' | 'SAMSUNG_HEALTH' | 'ABDM_PHR_IOT';
  deviceName: string;
  status: 'CONNECTED_LIVE' | 'SYNCED_JUST_NOW';
  lastSyncTime: string;
  metrics: {
    hrvMs: number;
    pulseBpm: number;
    skinTempDelta: string;
    sleepPositionDetected: string;
  };
  repertoryRubricsExtracted: string[];
}

interface WearableBiometricSyncHubProps {
  onCommitWearableRubricToMatrix?: (rubricPath: string) => void;
  theme?: 'dark' | 'light';
}

export const WearableBiometricSyncHub: React.FC<
  WearableBiometricSyncHubProps
> = ({ onCommitWearableRubricToMatrix, theme = 'dark' }) => {
  const isLight = theme === 'light';
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncedAlert, setSyncedAlert] = useState(false);

  const [devices] = useState<WearableDeviceStream[]>([
    {
      id: 'dev-apple-watch',
      brand: 'APPLE_HEALTH',
      deviceName: 'Apple Watch Ultra 2 (Apple HealthKit FHIR Sync)',
      status: 'CONNECTED_LIVE',
      lastSyncTime: 'Live (Every 60s)',
      metrics: {
        hrvMs: 28,
        pulseBpm: 92,
        skinTempDelta: '+1.8 °C Spike at 03:25 PM',
        sleepPositionDetected: 'Knee-Chest position (02:15 AM - 04:30 AM)',
      },
      repertoryRubricsExtracted: [
        'HEAD - PAIN - pulsating - sudden',
        'GENERALITIES - AGGRAVATION - 3 pm to 4 pm',
        'GENERALITIES - SLEEP - position - knee-chest position',
      ],
    },
    {
      id: 'dev-fitbit',
      brand: 'FITBIT_GOOGLE',
      deviceName: 'Fitbit Sense 2 (Google Health Connect API)',
      status: 'CONNECTED_LIVE',
      lastSyncTime: '2 mins ago',
      metrics: {
        hrvMs: 31,
        pulseBpm: 88,
        skinTempDelta: 'Nocturnal Flushes of Heat (+1.4 °C)',
        sleepPositionDetected: 'Restless Nocturnal Awakening',
      },
      repertoryRubricsExtracted: [
        'MIND - ANXIETY - night - sun set after',
        'GENERALITIES - HEAT - flushes of - sudden',
      ],
    },
    {
      id: 'dev-samsung',
      brand: 'SAMSUNG_HEALTH',
      deviceName: 'Samsung Galaxy Watch 6 (Samsung Health SDK)',
      status: 'CONNECTED_LIVE',
      lastSyncTime: '5 mins ago',
      metrics: {
        hrvMs: 30,
        pulseBpm: 90,
        skinTempDelta: 'Normal baseline',
        sleepPositionDetected: 'Right-sided sleeping preference',
      },
      repertoryRubricsExtracted: [
        'ABDOMEN - PAIN - right scapula - under lower angle',
      ],
    },
  ]);

  const handleSyncAllWearables = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedAlert(true);
      setTimeout(() => setSyncedAlert(false), 4000);
    }, 1200);
  };

  return (
    <div
      className={`p-5 rounded-2xl border font-mono space-y-5 transition-colors ${
        isLight
          ? 'bg-white border-slate-200 text-slate-900'
          : 'bg-[#0B0F19] border-[#1C1F26] text-white'
      }`}
    >
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4 border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-600 to-emerald-600 flex items-center justify-center text-white font-black shadow-md">
            <Watch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400">
              WEARABLE BIOMETRIC IOT SYNC HUB (APPLE HEALTH • FITBIT • SAMSUNG HEALTH)
            </h3>
            <p
              className={`text-xs ${
                isLight ? 'text-slate-600' : 'text-gray-400'
              }`}
            >
              Automatically converts HRV spikes, thermal rhythms, and nocturnal sleep positions into Homeopathic Repertory Rubrics
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {syncedAlert && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-1.5 animate-pulse">
              <CheckCircle2 className="w-4 h-4" /> WEARABLE RUBRICS SYNCED TO SIMILIMATRIX!
            </span>
          )}
          <button
            onClick={handleSyncAllWearables}
            disabled={isSyncing}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-black text-xs flex items-center space-x-2 shadow-md cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing Streams...' : 'Sync All Wearable Streams Now'}</span>
          </button>
        </div>
      </div>

      {/* WEARABLE STREAM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {devices.map((dev) => (
          <div
            key={dev.id}
            className={`p-4 rounded-xl border space-y-3 ${
              isLight
                ? 'bg-slate-50 border-slate-200'
                : 'bg-[#111317] border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b pb-2.5 border-slate-200 dark:border-slate-800">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                {dev.brand}
              </span>
              <span className="text-[10px] text-emerald-400 font-black flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {dev.status}
              </span>
            </div>

            <p className="font-black text-xs text-white line-clamp-1">
              {dev.deviceName}
            </p>

            {/* LIVE BIOMETRIC METRICS */}
            <div className="space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="text-gray-400">Heart Rate Variability (HRV):</span>
                <strong className="text-amber-400">{dev.metrics.hrvMs} ms</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pulse / Carotid Rate:</span>
                <strong className="text-emerald-400">{dev.metrics.pulseBpm} bpm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Skin Temp Spike:</span>
                <strong className="text-orange-400">{dev.metrics.skinTempDelta}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Sleep Position:</span>
                <strong className="text-cyan-400 text-[10px]">{dev.metrics.sleepPositionDetected}</strong>
              </div>
            </div>

            {/* REPERTORY RUBRICS DERIVED */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-[9px] font-black text-gray-400 uppercase">
                AUTOMATIC REPERTORY RUBRICS DERIVED:
              </span>
              <div className="space-y-1">
                {dev.repertoryRubricsExtracted.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-800 dark:text-gray-200 flex items-center justify-between"
                  >
                    <span className="truncate pr-2">{r}</span>
                    <button
                      onClick={() => onCommitWearableRubricToMatrix?.(r)}
                      className="px-1.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[9px] cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WearableBiometricSyncHub;
