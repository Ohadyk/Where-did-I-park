export const taskOptions = {
    taskName: 'parkingDetection',
    taskTitle: 'זיהוי חניות פעיל',
    taskDesc: 'נשמור עבורך את מיקום החניה',
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
