$ErrorActionPreference = "Stop"

try {
    Write-Host "Registering User..."
    $regBody = @{name="Test PDF"; email="pdfuser3@test.com"; password="password123"} | ConvertTo-Json
    try {
        $regResponse = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/register" -ContentType "application/json" -Body $regBody
        $token = $regResponse.token
    } catch {
        # If user exists, try login
        Write-Host "User might exist, logging in..."
        $loginBody = @{email="pdfuser3@test.com"; password="password123"} | ConvertTo-Json
        $loginResponse = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/auth/login" -ContentType "application/json" -Body $loginBody
        $token = $loginResponse.token
    }

    Write-Host "Got Token: $token"

    Write-Host "Requesting PDF..."
    $headers = @{Authorization=("Bearer " + $token)}
    Invoke-RestMethod -Method Get -Uri "http://localhost:5000/api/reports/export-pdf?type=monthly" -Headers $headers -OutFile "downloaded_report.pdf"

    Write-Host "PDF Downloaded Successfully to downloaded_report.pdf"
    
    if (Test-Path "downloaded_report.pdf") {
        $items = Get-Item "downloaded_report.pdf"
        Write-Host "File size: " $items.Length
    }

} catch {
    Write-Host "Error: " $_.Exception.Message
    Write-Host "Response: " $_.ErrorDetails.Message
    exit 1
}
