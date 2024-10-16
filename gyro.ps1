# Query for gyroscope sensor
$gyroscope = Get-WmiObject -Query "SELECT * FROM Win32_PnPEntity WHERE (PNPClass = 'Sensors' OR PNPClass = 'System') AND Caption LIKE '%gyroscope%'"

# Check if gyroscope was found
if ($gyroscope) {
    Write-Host "Gyroscope found:"
    $gyroscope | ForEach-Object {
        Write-Host "  Name: $($_.Caption)"
        Write-Host "  Device ID: $($_.DeviceID)"
    }
} else {
    Write-Host "No gyroscope sensor found on this system."
}

# Additional check for motion sensors
$motionSensors = Get-WmiObject -Query "SELECT * FROM Win32_PnPEntity WHERE (PNPClass = 'Sensors' OR PNPClass = 'System') AND (Caption LIKE '%motion%' OR Caption LIKE '%accelerometer%')"

if ($motionSensors) {
    Write-Host "`nOther motion-related sensors found:"
    $motionSensors | ForEach-Object {
        Write-Host "  Name: $($_.Caption)"
        Write-Host "  Device ID: $($_.DeviceID)"
    }
} else {
    Write-Host "`nNo other motion-related sensors found."
}