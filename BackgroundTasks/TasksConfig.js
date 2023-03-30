export const taskOptions = {
    taskName: 'parkingDetection',
    taskTitle: 'Parking Detection',
    taskDesc: 'Detects when you park',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#0047FF',
    parameters: {
        delay: 5000,
        initialData: {
            isOnRide: false,
            currentRide: {
                finishedRide: false,
                chargerDisconnected: false,
                bluetoothDisconnected: false,
                chargedDuringTheRide: false,
                usedBluetoothDuringTheRide: false
            }
        }
    },
};
