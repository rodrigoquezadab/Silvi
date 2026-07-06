# ============================================================
# actualizar_json.ps1
# Lee productos_sheets.csv (editado en Google Sheets o Excel)
# y sobreescribe productos.json con el formato correcto.
# ============================================================

$csvPath  = Join-Path $PSScriptRoot "productos_sheets.csv"
$jsonPath = Join-Path $PSScriptRoot "productos.json"

if (-not (Test-Path $csvPath)) {
    Write-Error "No se encontró el archivo '$csvPath'. Asegúrate de exportarlo desde Google Sheets como CSV."
    exit 1
}

# Leer CSV con UTF-8 para preservar tildes y eñes
$rows = [System.IO.File]::ReadAllText($csvPath, [System.Text.Encoding]::UTF8) |
    ConvertFrom-Csv

$products = [System.Collections.Generic.List[object]]::new()

foreach ($r in $rows) {

    # Separar listas usando " | " como separador
    function SplitField($val) {
        if (-not $val -or $val.Trim() -eq "") { return @() }
        return @($val -split '\s*\|\s*' | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" })
    }

    # Parsear enteros o nulos
    function ToInt($val) {
        $v = $val.Trim()
        if ($v -eq "" -or $v -eq "null") { return $null }
        return [int]$v
    }

    # Parsear booleanos
    $active = ($r.activo -match '^(true|1)$')

    # Precio con descuento: si está vacío -> null
    $discountedPrice    = if ($r.precio_con_descuento.Trim() -eq "") { $null } else { $r.precio_con_descuento.Trim() }
    $discountedPriceVal = ToInt $r.precio_descuento_numerico

    $obj = [Ordered]@{
        id                 = $r.id.Trim()
        name               = $r.nombre.Trim()
        category           = $r.categoria.Trim()
        subcategory        = $r.subcategoria.Trim()
        material           = $r.material.Trim()
        unitType           = $r.tipo_unidad.Trim()
        description        = $r.descripcion.Trim()
        features           = SplitField $r.caracteristicas
        uses               = $r.usos.Trim()
        dimensions         = $r.dimensiones.Trim()
        recommendations    = $r.recomendaciones.Trim()
        price              = $r.precio.Trim()
        priceVal           = ToInt $r.precio_numerico
        discountPercent    = ToInt $r.descuento_pct
        discountedPrice    = $discountedPrice
        discountedPriceVal = $discountedPriceVal
        active             = $active
        stock              = ToInt $r.stock
        defaultImage       = $r.imagen_principal.Trim()
        gallery            = SplitField $r.galeria
        colors             = SplitField $r.colores
    }

    $products.Add($obj)
}

# Serializar a JSON legible (indentado con 2 espacios)
$jsonOut = ConvertTo-Json -InputObject $products -Depth 10

# Guardar como UTF-8 sin BOM (estándar para fetch web)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($jsonPath, $jsonOut, $utf8NoBom)

Write-Output ""
Write-Output "✅  productos.json actualizado exitosamente desde el CSV."
Write-Output "    Productos procesados: $($products.Count)"
Write-Output ""
