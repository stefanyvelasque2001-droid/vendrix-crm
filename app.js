/**
 * VENDRIX BI - ENGINE CORE DEFINITIVO, RESPONSIVE Y 100% DINÁMICO (2026)
 */

let DICCIONARIO_PRODUCTOS = {
    "55": { "nombre": "INKA KOLA", "precio": 3.80, "costo": 1.90 },
    "56": { "nombre": "COCA COLA", "precio": 3.80, "costo": 1.90 },
    "58": { "nombre": "CIELO MANZANA", "precio": 3.00, "costo": 1.40 },
    "59": { "nombre": "SPRITE", "precio": 3.00, "costo": 1.40 },
    "51": { "nombre": "HEY FIT CAMU CAMU", "precio": 2.80, "costo": 1.30 },
    "53": { "nombre": "HEY FIT HIERBA LUISA", "precio": 2.80, "costo": 1.30 },
    "54": { "nombre": "HEY FIT COCA COLA", "precio": 2.80, "costo": 1.30 },
    "41": { "nombre": "GATORADE", "precio": 2.50, "costo": 1.20 },
    "50": { "nombre": "AGUA SAN MATEO", "precio": 2.50, "costo": 1.10 },
    "57": { "nombre": "CIELO limon", "precio": 2.50, "costo": 1.10 },
    "31": { "nombre": "ROSCA", "precio": 2.00, "costo": 0.90 },
    "32": { "nombre": "PALITOS DE AJONJOLI", "precio": 2.00, "costo": 0.90 },
    "33": { "nombre": "NICK TACO", "precio": 2.00, "costo": 0.90 },
    "34": { "nombre": "NICK TACO", "precio": 2.00, "costo": 0.90 },
    "35": { "nombre": "RITZ TACO", "precio": 2.00, "costo": 0.90 },
    "38": { "nombre": "ROSCA", "precio": 2.00, "costo": 0.90 },
    "42": { "nombre": "SEVEN UP", "precio": 2.00, "costo": 0.95 },
    "43": { "nombre": "CONCORDIA NARANJA", "precio": 2.00, "costo": 0.95 },
    "44": { "nombre": "CONCORDIA FRESA", "precio": 2.00, "costo": 0.95 },
    "45": { "nombre": "CONCORDIA PIÑA", "precio": 2.00, "costo": 0.95 },
    "46": { "nombre": "GUARANITA", "precio": 2.00, "costo": 0.95 },
    "47": { "nombre": "SAN MATEO CON GAS", "precio": 2.00, "costo": 0.90 },
    "21": { "nombre": "CHOCOSODA", "precio": 1.80, "costo": 0.80 },
    "22": { "nombre": "PICARAS", "precio": 1.80, "costo": 0.80 },
    "23": { "nombre": "MOROCHAS", "precio": 1.80, "costo": 0.80 },
    "24": { "nombre": "QUINOA", "precio": 1.80, "costo": 0.80 },
    "26": { "nombre": "TENTACIÓN DE CHOCOLATE", "precio": 1.80, "costo": 0.80 },
    "28": { "nombre": "DONUTS", "precio": 1.80, "costo": 0.80 },
    "29": { "nombre": "CLUB SOCIAL", "precio": 1.80, "costo": 0.80 },
    "30": { "nombre": "GLACITAS", "precio": 1.80, "costo": 0.80 },
    "36": { "nombre": "CHIFLES", "precio": 1.80, "costo": 0.75 },
    "37": { "nombre": "FRUTA MIXTA", "precio": 1.80, "costo": 0.75 },
    "39": { "nombre": "CHIPS GALLETA", "precio": 1.80, "costo": 0.80 },
    "5":  { "nombre": "CUATES PICANTES", "precio": 1.50, "costo": 0.65 },
    "27": { "nombre": "INTEGRALES DE MIEL", "precio": 1.50, "costo": 0.65 },
    "40": { "nombre": "SODA LINE", "precio": 1.50, "costo": 0.65 },
    "49": { "nombre": "AGUA CIELO", "precio": 1.50, "costo": 0.60 },
    "60": { "nombre": "CIELO NARANJA", "precio": 2.50, "costo": 1.10 },
    "19": { "nombre": "RITZ PEQUEÑO", "precio": 1.80, "costo": 0.80 },
    "25": { "nombre": "VAINILLA", "precio": 1.20, "costo": 0.50 },
    "48": { "nombre": "AGUA SWORD", "precio": 1.20, "costo": 0.50 },
    "52": { "nombre": "HEY FIT COCO", "precio": 2.80, "costo": 1.30 },
    "9":  { "nombre": "CHEETOS PICANTES", "precio": 2.00, "costo": 0.90 },
    "11": { "nombre": "TRIDENT", "precio": 2.00, "costo": 0.80 },
    "14": { "nombre": "CARAMELO FULL", "precio": 2.00, "costo": 0.80 },
    "15": { "nombre": "SUBLIME", "precio": 2.00, "costo": 0.90 },
    "13": { "nombre": "CHIPS GALLETA", "precio": 1.80, "costo": 0.80 },
    "18": { "nombre": "CASINO", "precio": 1.80, "costo": 0.80 },
    "01": { "nombre": "CHIFLES", "precio": 1.80, "costo": 0.75 },
    "17": { "nombre": "BLACK OUT 6 UND", "precio": 1.60, "costo": 0.70 },
    "3":  { "nombre": "TIKTOK", "precio": 1.50, "costo": 0.60 },
    "7":  { "nombre": "CHIZITO", "precio": 1.50, "costo": 0.65 },
    "16": { "nombre": "BLACK OUT 4UND", "precio": 1.30, "costo": 0.55 },
    "1":  { "nombre": "INKACHIPS SAL", "precio": 2.50, "costo": 1.10 },
    "12": { "nombre": "SODA V", "precio": 1.20, "costo": 0.50 },
    "20": { "nombre": "RELLENITAS", "precio": 1.20, "costo": 0.50 }
};

let DATABASE_STATE = [];
let STAGING_MEMORIA_TEMPORAL = []; 
let HISTORIAL_COMPRAS_LOTES = []; 
let HISTORIAL_GASTOS_EXTRA = []; 
let HISTORIAL_TELEMETRIA_BANDEJAS = []; 

let CURRENT_EDIT_LOTE_ID = null;
let CURRENT_EDIT_TELEMETRIA_ID = null;
let CURRENT_EDIT_GASTO_ID = null;
let chartHistory = null, chartPayments = null, chartTopProducts = null;
let dtInstance = null, dtDicMaster = null, dtSimulationOrder = null, dtGastosMaster = null, dtTelemetryMaster = null;
function normalizeCode(code) {
    return String(code || '').replace('COD-', '').trim();
}

function normalizeMachine(machine) {
    return String(machine || 'MAQUINA 1').trim().toUpperCase();
}

function normalizePayment(payment) {
    return String(payment || 'Otros').trim();
}

function normalizeDateValue(value) {
    if (!value) return '';
    const text = String(value).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

    const parts = text.split(/[\/-]/);
    if (parts.length === 3) {
        if (parts[0].length === 4) return `${parts[0]}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
        return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }

    return text;
}

function enrichSaleRecord(row) {
    const rawCode = normalizeCode(row.rawCode || row.codigo);
    const meta = DICCIONARIO_PRODUCTOS[rawCode];

    return {
        ...row,
        fecha: normalizeDateValue(row.fecha),
        maquina: normalizeMachine(row.maquina),
        pago: normalizePayment(row.pago),
        rawCode,
        codigo: `COD-${rawCode}`,
        producto: meta ? meta.nombre : (row.producto || `Snack Codigo ${rawCode}`),
        cantidad: Number(row.cantidad || 1),
        valor: Number(row.valor || 0)
    };
}

function getFilteredSales() {
    const sDate = document.getElementById('filterStartDate').value;
    const eDate = document.getElementById('filterEndDate').value;
    const paymentSel = document.getElementById('filterPayment').value;
    const machineSel = normalizeMachine(document.getElementById('filterMachine').value);

    return DATABASE_STATE.map(enrichSaleRecord).filter(r => {
        if (sDate && r.fecha < sDate) return false;
        if (eDate && r.fecha > eDate) return false;
        if (paymentSel !== 'TODOS' && r.pago !== paymentSel) return false;
        if (machineSel !== 'TODOS' && normalizeMachine(r.maquina) !== machineSel) return false;
        return true;
    });
}

function saveSalesOnly() {
    DATABASE_STATE = DATABASE_STATE.map(enrichSaleRecord);
    localStorage.setItem('v_bi_data', JSON.stringify(DATABASE_STATE));
}

document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupUIEventListeners(); // CONEXIÓN CRÍTICA DE BOTONES RESTAURADA
    loadApplicationData();
});

function setupNavigation() {
    const links = document.querySelectorAll('#main-nav .nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            document.querySelectorAll('.content-view').forEach(view => { view.classList.add('d-none'); });
            document.getElementById(targetId).classList.remove('d-none');
        });
    });
}

function setupUIEventListeners() {
    // Vincular todos los clics de los formularios para revivir la interactividad de la página
    document.getElementById('btnPreviewPasteData').addEventListener('click', convertRawTextToStagingPreview);
    document.getElementById('btnCommitStagingData').addEventListener('click', commitStagingToDashboard);
    document.getElementById('formAddStock').addEventListener('submit', handleNewInvoiceSubmit);
    document.getElementById('formAddDicProduct').addEventListener('submit', handleDicProductSubmit);
    document.getElementById('formAddGasto').addEventListener('submit', handleNewGastoSubmit);
    document.getElementById('formAddMachineTelemetry').addEventListener('submit', handleNewTelemetrySubmit);
    
    document.getElementById('stockProductSelectorAutoComplete').addEventListener('change', (e) => {
        document.getElementById('stockProductCode').value = e.target.value;
    });

    document.getElementById('simPeriodDays').addEventListener('change', () => {
        renderSimulationOrderTable(DATABASE_STATE);
    });

    document.getElementById('btnForceRefreshGlobal').addEventListener('click', () => { 
        processAndRenderAll(); 
        alert("¡Ecosistema VENDRIX BI sincronizado y actualizado!"); 
    });

    ['filterStartDate', 'filterEndDate', 'filterPayment', 'filterMachine'].forEach(id => {
        document.getElementById(id).addEventListener('change', processAndRenderAll);
    });

    document.getElementById('btnResetFilters').addEventListener('click', () => {
        document.getElementById('filterStartDate').value = ''; 
        document.getElementById('filterEndDate').value = '';
        document.getElementById('filterPayment').value = 'TODOS'; 
        document.getElementById('filterMachine').value = 'TODOS';
        processAndRenderAll();
    });

    document.getElementById('btnClearData').addEventListener('click', () => { 
        if(confirm("¿Deseas reiniciar la memoria local?")) { localStorage.clear(); location.reload(); } 
    });
}

function loadApplicationData() {
    const localStore = localStorage.getItem('v_bi_data');
    const localLotes = localStorage.getItem('v_bi_lotes');
    const localDic = localStorage.getItem('v_bi_dic');
    const localGastos = localStorage.getItem('v_bi_gastos');
    const localTel = localStorage.getItem('v_bi_tel');

    if (localDic) DICCIONARIO_PRODUCTOS = JSON.parse(localDic);
    DATABASE_STATE = localStore ? JSON.parse(localStore).map(enrichSaleRecord) : [];
    HISTORIAL_GASTOS_EXTRA = localGastos ? JSON.parse(localGastos) : [];
    HISTORIAL_TELEMETRIA_BANDEJAS = localTel ? JSON.parse(localTel) : [];
    
    if (localLotes) {
        HISTORIAL_COMPRAS_LOTES = JSON.parse(localLotes);
    } else {
        Object.keys(DICCIONARIO_PRODUCTOS).forEach((code, idx) => {
            HISTORIAL_COMPRAS_LOTES.push({
                "id_lote": `LOTE-${idx}`, "num_factura": "FACT-BASE", "fecha_compra": "2026-05-01", "rawCode": code,
                "costo_total": DICCIONARIO_PRODUCTOS[code].costo * 100, "descuento": 0, "cantidad": 100, "costo_unitario": DICCIONARIO_PRODUCTOS[code].costo
            });
        });
        localStorage.setItem('v_bi_lotes', JSON.stringify(HISTORIAL_COMPRAS_LOTES));
    }

    buildFormSelectorsAutoComplete();
    renderDicMasterTable();
    renderInvoiceHistoryTable();
    renderGastosMasterTable();
    renderTelemetryMasterTable();
    populateSelectors(DATABASE_STATE);
    processAndRenderAll();
}

function buildFormSelectorsAutoComplete() {
    const s1 = document.getElementById('stockProductSelectorAutoComplete');
    const s2 = document.getElementById('telProductSelector');
    if(!s1 || !s2) return;
    s1.innerHTML = '<option value="" selected disabled>Buscar snack por nombre...</option>';
    s2.innerHTML = '<option value="" selected disabled>Seleccionar producto...</option>';
    Object.keys(DICCIONARIO_PRODUCTOS).sort((a,b)=>DICCIONARIO_PRODUCTOS[a].nombre.localeCompare(DICCIONARIO_PRODUCTOS[b].nombre)).forEach(c => {
        const optionHtml = `<option value="${c}">${DICCIONARIO_PRODUCTOS[c].nombre} (COD-${c})</option>`;
        s1.innerHTML += optionHtml; s2.innerHTML += optionHtml;
    });
}

// GESTIÓN DE LA TELEMETRÍA LOGÍSTICA REAL DE LOS RESORTES
function handleNewTelemetrySubmit(e) {
    e.preventDefault();
    const mach = document.getElementById('telMachineId').value.trim().toUpperCase();
    const code = document.getElementById('telProductSelector').value;
    const dateLoad = document.getElementById('telLoadDate').value;
    const qty = parseInt(document.getElementById('telQty').value) || 0;

    const payload = { id_tel: CURRENT_EDIT_TELEMETRIA_ID || `T-${Date.now()}`, maquina: mach, rawCode: code, fecha_carga: dateLoad, cantidad_inyectada: qty };
    if (CURRENT_EDIT_TELEMETRIA_ID) {
        HISTORIAL_TELEMETRIA_BANDEJAS = HISTORIAL_TELEMETRIA_BANDEJAS.map(t => t.id_tel === CURRENT_EDIT_TELEMETRIA_ID ? payload : t);
    } else {
        HISTORIAL_TELEMETRIA_BANDEJAS.push(payload);
    }

    localStorage.setItem('v_bi_tel', JSON.stringify(HISTORIAL_TELEMETRIA_BANDEJAS));
    CURRENT_EDIT_TELEMETRIA_ID = null;
    document.getElementById('formAddMachineTelemetry').reset();
    document.getElementById('telMachineId').value = mach || 'MAQUINA 1';
    document.querySelector('#formAddMachineTelemetry button[type="submit"]').innerText = 'Guardar Lote en Resorte';
    renderTelemetryMasterTable();
    processAndRenderAll();
    alert("Stock en máquina guardado correctamente.");
}
function renderTelemetryMasterTable() {
    const tbody = document.querySelector('#tableTelemetryMaster tbody'); if(!tbody) return;
    if(dtTelemetryMaster) dtTelemetryMaster.destroy(); tbody.innerHTML = '';
    
    const filterMach = document.getElementById('filterMachine').value.toUpperCase();
    const sDate = document.getElementById('filterStartDate').value;
    const eDate = document.getElementById('filterEndDate').value;

    HISTORIAL_TELEMETRIA_BANDEJAS.forEach(t => {
        if(filterMach !== 'TODOS' && t.maquina !== filterMach) return;

        const prod = DICCIONARIO_PRODUCTOS[t.rawCode];
        const nombreText = prod ? prod.nombre : 'Snack';

        // Lógica: Contar salidas del Excel posteriores o iguales a la carga física
        const ventasPosteriores = DATABASE_STATE.filter(r => {
            if(r.rawCode !== t.rawCode) return false;
            if(r.maquina.toUpperCase() !== t.maquina) return false;
            if(r.fecha < t.fecha_carga) return false;
            if(sDate && r.fecha < sDate) return false;
            if(eDate && r.fecha > eDate) return false;
            return true;
        }).reduce((sum, r) => sum + r.cantidad, 0);

        const stockEnMaquinaReal = Math.max(t.cantidad_inyectada - ventasPosteriores, 0);

        let semaforo = '<span class="badge bg-success w-100 py-1">Abastecido</span>';
        if(stockEnMaquinaReal <= 2) semaforo = '<span class="badge bg-danger w-100 py-1">Urgente Abastecer</span>';
        else if(stockEnMaquinaReal <= 5) semaforo = '<span class="badge bg-warning text-dark w-100 py-1">Medio</span>';

        tbody.innerHTML += `
            <tr>
                <td><span class="badge bg-secondary">${t.maquina}</span></td>
                <td class="font-monospace fw-bold">COD-${t.rawCode}</td>
                <td><strong>${nombreText}</strong></td>
                <td class="font-monospace">${t.fecha_carga}</td>
                <td class="text-end fw-bold text-primary bg-primary bg-opacity-10">${t.cantidad_inyectada}</td>
                <td class="text-end text-danger font-monospace">-${ventasPosteriores}</td>
                <td class="text-end table-primary font-monospace fw-bold fs-6">${stockEnMaquinaReal}</td>
                <td>${semaforo}</td><td class="text-center"><button class="btn btn-sm btn-outline-primary py-0 px-2 me-1" onclick="editTelemetry('${t.id_tel}')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="deleteTelemetry('${t.id_tel}')"><i class="fa-solid fa-trash"></i></button></td></tr>`;
    });
    dtTelemetryMaster = $('#tableTelemetryMaster').DataTable({ destroy: true, pageLength: 10, order: [[1, 'asc']], language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' } });
}
function editTelemetry(id) {
    const t = HISTORIAL_TELEMETRIA_BANDEJAS.find(item => item.id_tel === id);
    if (!t) return;
    CURRENT_EDIT_TELEMETRIA_ID = id;
    document.getElementById('telMachineId').value = t.maquina || 'MAQUINA 1';
    document.getElementById('telProductSelector').value = t.rawCode || '';
    document.getElementById('telLoadDate').value = t.fecha_carga || '';
    document.getElementById('telQty').value = t.cantidad_inyectada || 0;
    document.querySelector('#formAddMachineTelemetry button[type="submit"]').innerText = 'Actualizar Stock en Máquina';
}

function deleteTelemetry(id) {
    if (!confirm("¿Borrar este registro de stock en máquina?")) return;
    HISTORIAL_TELEMETRIA_BANDEJAS = HISTORIAL_TELEMETRIA_BANDEJAS.filter(t => t.id_tel !== id);
    localStorage.setItem('v_bi_tel', JSON.stringify(HISTORIAL_TELEMETRIA_BANDEJAS));
    renderTelemetryMasterTable();
    processAndRenderAll();
}
// GESTIÓN DE EGRESOS Y CUADRO DEDUCTOR SELECTIVO
function handleNewGastoSubmit(e) {
    e.preventDefault();
    const gNum = document.getElementById('gastoNum').value.trim();
    const gDate = document.getElementById('gastoDate').value;
    const gAmount = parseFloat(document.getElementById('gastoAmount').value) || 0;
    const gReason = document.getElementById('gastoReason').value.trim();
    const gUser = document.getElementById('gastoUser').value.trim();
    const gObs = document.getElementById('gastoObs').value.trim() || 'Ninguna';

    const existing = CURRENT_EDIT_GASTO_ID ? HISTORIAL_GASTOS_EXTRA.find(g => g.id_gasto === CURRENT_EDIT_GASTO_ID) : null;
    const payload = {
        id_gasto: CURRENT_EDIT_GASTO_ID || `G-${Date.now()}`,
        num_comprobante: gNum,
        fecha: gDate,
        monto: gAmount,
        motivo: gReason,
        responsable: gUser,
        observacion: gObs,
        adjunto: existing ? existing.adjunto : "Boleta.pdf",
        deducir: existing ? !!existing.deducir : false
    };

    if (CURRENT_EDIT_GASTO_ID) {
        HISTORIAL_GASTOS_EXTRA = HISTORIAL_GASTOS_EXTRA.map(g => g.id_gasto === CURRENT_EDIT_GASTO_ID ? payload : g);
    } else {
        HISTORIAL_GASTOS_EXTRA.push(payload);
    }

    localStorage.setItem('v_bi_gastos', JSON.stringify(HISTORIAL_GASTOS_EXTRA));
    CURRENT_EDIT_GASTO_ID = null;
    document.getElementById('formAddGasto').reset();
    document.querySelector('#formAddGasto button[type="submit"]').innerText = 'Grabar Gasto';
    renderGastosMasterTable();
    recalcularCuadroDeductorGastos();
    alert("Gasto guardado correctamente.");
}
function renderGastosMasterTable() {
    const tbody = document.querySelector('#tableGastosMaster tbody'); if (!tbody) return;
    if (dtGastosMaster) dtGastosMaster.destroy(); tbody.innerHTML = '';
    HISTORIAL_GASTOS_EXTRA.forEach(g => {
        tbody.innerHTML += `
            <tr>
                <td class="text-center"><input type="checkbox" class="form-check-input" ${g.deducir ? 'checked':''} onclick="toggleGastoDeduccion('${g.id_gasto}')"></td>
                <td class="font-monospace fw-bold">${g.num_comprobante}</td><td>${g.fecha}</td>
                <td class="text-end fw-bold text-danger">S/ ${g.monto.toFixed(2)}</td><td>${g.motivo}</td><td>${g.responsable}</td><td>${g.observacion}</td>
                <td class="text-center text-primary"><i class="fa-solid fa-file-pdf fs-5" style="cursor:pointer;"></i></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary py-0 px-2 me-1" onclick="editGasto('${g.id_gasto}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="deleteGasto('${g.id_gasto}')"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
    });
    dtGastosMaster = $('#tableGastosMaster').DataTable({ destroy: true, pageLength: 5, order: [[2, 'desc']], language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' } });
    recalcularCuadroDeductorGastos();
}
function toggleGastoDeduccion(id) {
    let egreso = HISTORIAL_GASTOS_EXTRA.find(g => g.id_gasto === id);
    if(egreso) { egreso.deducir = !egreso.deducir; localStorage.setItem('v_bi_gastos', JSON.stringify(HISTORIAL_GASTOS_EXTRA)); recalcularCuadroDeductorGastos(); }
}
function editGasto(id) {
    const g = HISTORIAL_GASTOS_EXTRA.find(item => item.id_gasto === id);
    if (!g) return;
    CURRENT_EDIT_GASTO_ID = id;
    document.getElementById('gastoNum').value = g.num_comprobante || '';
    document.getElementById('gastoDate').value = g.fecha || '';
    document.getElementById('gastoAmount').value = g.monto || 0;
    document.getElementById('gastoReason').value = g.motivo || '';
    document.getElementById('gastoUser').value = g.responsable || '';
    document.getElementById('gastoObs').value = g.observacion || '';
    document.querySelector('#formAddGasto button[type="submit"]').innerText = 'Actualizar Gasto';
}

function deleteGasto(id) {
    if (!confirm("¿Borrar este gasto?")) return;
    HISTORIAL_GASTOS_EXTRA = HISTORIAL_GASTOS_EXTRA.filter(g => g.id_gasto !== id);
    localStorage.setItem('v_bi_gastos', JSON.stringify(HISTORIAL_GASTOS_EXTRA));
    renderGastosMasterTable();
    recalcularCuadroDeductorGastos();
}
function recalcularCuadroDeductorGastos() {
    let gananciaBrutaDashboard = 0;
    const paymentSel = document.getElementById('filterPayment').value;
    const machineSel = document.getElementById('filterMachine').value.toUpperCase();
    const sDate = document.getElementById('filterStartDate').value;
    const eDate = document.getElementById('filterEndDate').value;

    DATABASE_STATE.filter(r => {
        if (sDate && r.fecha < sDate) return false; if (eDate && r.fecha > eDate) return false;
        if (paymentSel !== 'TODOS' && r.pago !== paymentSel) return false;
        if (machineSel !== 'TODOS' && r.maquina.toUpperCase() !== machineSel) return false; 
        return true;
    }).forEach(r => {
        const meta = DICCIONARIO_PRODUCTOS[r.rawCode];
        gananciaBrutaDashboard += meta ? (r.valor - meta.costo) : (r.valor * 0.40);
    });

    let totalGastosDeducibles = HISTORIAL_GASTOS_EXTRA.filter(g => g.deducir).reduce((sum, g) => sum + g.monto, 0);
    let utilidadNetaFinal = gananciaBrutaDashboard - totalGastosDeducibles;

    document.getElementById('deductGrossProfit').innerText = `S/ ${gananciaBrutaDashboard.toFixed(2)}`;
    document.getElementById('deductTotalSelected').innerText = `S/ ${totalGastosDeducibles.toFixed(2)}`;
    document.getElementById('deductNetProfit').innerText = `S/ ${utilidadNetaFinal.toFixed(2)}`;
}

// CATÁLOGO COMERCIAL
function handleDicProductSubmit(e) {
    e.preventDefault();
    const code = document.getElementById('dicProductCode').value.trim().toUpperCase();
    const name = document.getElementById('dicProductName').value.trim();
    const price = parseFloat(document.getElementById('dicProductPrice').value) || 0;
    const costoActual = DICCIONARIO_PRODUCTOS[code] ? DICCIONARIO_PRODUCTOS[code].costo : (price * 0.5);

    DICCIONARIO_PRODUCTOS[code] = { "nombre": name, "precio": price, "costo": costoActual };
    localStorage.setItem('v_bi_dic', JSON.stringify(DICCIONARIO_PRODUCTOS));
    DATABASE_STATE = DATABASE_STATE.map(enrichSaleRecord);
    saveSalesOnly();
    document.getElementById('formAddDicProduct').reset(); 
    buildFormSelectorsAutoComplete(); 
    renderDicMasterTable(); 
    processAndRenderAll(); 
    alert("Catálogo Maestro Modificado.");
}

function renderDicMasterTable() {
    const tbody = document.querySelector('#tableDicMaster tbody'); if (!tbody) return;
    if (dtDicMaster) { dtDicMaster.destroy(); } tbody.innerHTML = '';
    Object.keys(DICCIONARIO_PRODUCTOS).forEach(code => {
        const p = DICCIONARIO_PRODUCTOS[code], costoReal = p.costo || 0, precioVenta = p.precio || 0, margenDinero = precioVenta - costoReal, margenPorcentaje = precioVenta > 0 ? (margenDinero / precioVenta) * 100 : 0, markupPorcentaje = costoReal > 0 ? (margenDinero / costoReal) * 100 : 0;
        tbody.innerHTML += `<tr><td class="font-monospace fw-bold">COD-${code}</td><td><strong>${p.nombre}</strong></td><td class="text-end font-monospace text-danger text-opacity-75">S/ ${costoReal.toFixed(2)}</td><td class="text-end font-monospace text-primary fw-bold">S/ ${precioVenta.toFixed(2)}</td><td class="text-end font-monospace text-success fw-bold">S/ ${margenDinero.toFixed(2)}</td><td class="text-end font-monospace text-success">${margenPorcentaje.toFixed(1)}%</td><td class="text-end font-monospace text-warning fw-bold bg-warning bg-opacity-10">${markupPorcentaje.toFixed(1)}%</td><td class="text-center"><button class="btn btn-xs btn-outline-primary py-0 px-2 small me-1" onclick="editDicProductField('${code}')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-xs btn-outline-danger py-0 px-2 small" onclick="deleteDicProductField('${code}')"><i class="fa-solid fa-trash"></i></button></td></tr>`;
    });
    dtDicMaster = $('#tableDicMaster').DataTable({ destroy: true, pageLength: 10, dom: 'Bfrtip', buttons: [{ extend: 'excelHtml5', text: '<i class="fa-solid fa-file-excel me-1"></i> Descargar Catálogo', className: 'btn btn-success btn-sm mt-2' }], order: [[4, 'desc']], language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' } });
}

function editDicProductField(code) { const p = DICCIONARIO_PRODUCTOS[code]; if (!p) return; document.getElementById('dicProductCode').value = code; document.getElementById('dicProductCode').disabled = true; document.getElementById('dicProductName').value = p.nombre; document.getElementById('dicProductPrice').value = p.precio; }
function deleteDicProductField(code) { if (confirm("¿Borrar?")) { delete DICCIONARIO_PRODUCTOS[code]; localStorage.setItem('v_bi_dic', JSON.stringify(DICCIONARIO_PRODUCTOS)); renderDicMasterTable(); processAndRenderAll(); } }

// FACTURACIÓN DE CENTRAL DE ALMACÉN
function handleNewInvoiceSubmit(e) {
    e.preventDefault();
    const invoiceNum = document.getElementById('stockInvoiceNum').value.trim();
    const code = document.getElementById('stockProductCode').value;
    const dateInvoice = document.getElementById('stockInvoiceDate').value;
    const qty = parseInt(document.getElementById('stockQty').value) || 0;
    const totalCost = parseFloat(document.getElementById('stockTotalCost').value) || 0;
    const discount = parseFloat(document.getElementById('stockDiscount').value) || 0;

    if (code && dateInvoice && qty > 0 && totalCost >= 0) {
        const unitCostCalculated = (totalCost - discount) / qty;
        if (DICCIONARIO_PRODUCTOS[code]) DICCIONARIO_PRODUCTOS[code].costo = unitCostCalculated;
        localStorage.setItem('v_bi_dic', JSON.stringify(DICCIONARIO_PRODUCTOS));

        const payload = { "id_lote": CURRENT_EDIT_LOTE_ID || `LOTE-${Date.now()}`, num_factura: invoiceNum, fecha_compra: dateInvoice, rawCode: code, costo_total: totalCost, descuento: discount, cantidad: qty, costo_unitario: unitCostCalculated };
        if (CURRENT_EDIT_LOTE_ID) {
            HISTORIAL_COMPRAS_LOTES = HISTORIAL_COMPRAS_LOTES.map(l => l.id_lote === CURRENT_EDIT_LOTE_ID ? payload : l);
        } else {
            HISTORIAL_COMPRAS_LOTES.push(payload);
        }
        localStorage.setItem('v_bi_lotes', JSON.stringify(HISTORIAL_COMPRAS_LOTES));
        CURRENT_EDIT_LOTE_ID = null;
        document.getElementById('stockInvoiceNum').value = ''; document.getElementById('stockProductSelectorAutoComplete').value = ''; document.getElementById('stockProductCode').value = ''; document.getElementById('stockQty').value = ''; document.getElementById('stockTotalCost').value = ''; document.getElementById('stockDiscount').value = '0.00';
        document.querySelector('#formAddStock button[type="submit"]').innerText = 'Registrar Compra Lote';
        renderDicMasterTable(); renderInvoiceHistoryTable(); processAndRenderAll(); alert("Factura guardada.");
    }
}
function renderInvoiceHistoryTable() {
    const tbody = document.querySelector('#tableInvoiceHistory tbody'); if (!tbody) return;
    tbody.innerHTML = ''; let sortedLotes = [...HISTORIAL_COMPRAS_LOTES].sort((a,b) => b.fecha_compra.localeCompare(a.fecha_compra));
    sortedLotes.forEach(l => {
        const prod = DICCIONARIO_PRODUCTOS[l.rawCode];
        tbody.innerHTML += `<tr><td>${l.num_factura || 'S/N'}</td><td>${l.fecha_compra}</td><td class="font-monospace">COD-${l.rawCode}</td><td><strong>${prod ? prod.nombre : "Snack"}</strong></td><td class="text-end">S/ ${l.costo_total.toFixed(2)}</td><td class="text-end text-muted">S/ ${l.descuento.toFixed(2)}</td><td class="text-end fw-bold">${l.cantidad}</td><td class="text-end text-primary fw-bold">S/ ${l.costo_unitario.toFixed(2)}</td><td class="text-center"><button class="btn btn-xs btn-outline-primary py-0 px-2 me-1" onclick="editInvoiceLote('${l.id_lote}')"><i class="fa-solid fa-pen"></i></button><button class="btn btn-xs btn-outline-danger py-0 px-2" onclick="deleteInvoiceLote('${l.id_lote}')"><i class="fa-solid fa-trash"></i></button></td></tr>`;
    });
}
function editInvoiceLote(id) {
    const l = HISTORIAL_COMPRAS_LOTES.find(item => item.id_lote === id);
    if (!l) return;
    CURRENT_EDIT_LOTE_ID = id;
    document.getElementById('stockInvoiceNum').value = l.num_factura || '';
    document.getElementById('stockProductSelectorAutoComplete').value = l.rawCode || '';
    document.getElementById('stockProductCode').value = l.rawCode || '';
    document.getElementById('stockInvoiceDate').value = l.fecha_compra || '';
    document.getElementById('stockQty').value = l.cantidad || 0;
    document.getElementById('stockTotalCost').value = l.costo_total || 0;
    document.getElementById('stockDiscount').value = l.descuento || 0;
    document.querySelector('#formAddStock button[type="submit"]').innerText = 'Actualizar Compra Lote';
}
function deleteInvoiceLote(id) { if(confirm("¿Borrar?")) { HISTORIAL_COMPRAS_LOTES = HISTORIAL_COMPRAS_LOTES.filter(l => l.id_lote !== id); localStorage.setItem('v_bi_lotes', JSON.stringify(HISTORIAL_COMPRAS_LOTES)); renderInvoiceHistoryTable(); processAndRenderAll(); } }

// SIMULADOR DE COMPRAS PROYECTADO
function renderSimulationOrderTable(filteredSales) {
    const tbody = document.querySelector('#tableSimulationOrder tbody'); if (!tbody) return;
    if (dtSimulationOrder) { dtSimulationOrder.destroy(); } tbody.innerHTML = '';
    const uniqueDates = [...new Set(DATABASE_STATE.map(r => r.fecha))]; const totalDiasReporte = Math.max(uniqueDates.length, 1);
    const ventasPorCodigo = {}; filteredSales.forEach(r => { ventasPorCodigo[r.rawCode] = (ventasPorCodigo[r.rawCode] || 0) + r.cantidad; });
    const comprasTotalesPorCodigo = {}; HISTORIAL_COMPRAS_LOTES.forEach(l => { comprasTotalesPorCodigo[l.rawCode] = (comprasTotalesPorCodigo[l.rawCode] || 0) + l.cantidad; });
    const diasCoberturaSugerida = parseInt(document.getElementById('simPeriodDays').value) || 7;

    Object.keys(DICCIONARIO_PRODUCTOS).forEach(code => {
        const p = DICCIONARIO_PRODUCTOS[code], totalVentasPeriodo = ventasPorCodigo[code] || 0, velocidadVentaDiaria = totalVentasPeriodo / totalDiasReporte, stockRequeridoFuturo = Math.ceil(velocidadVentaDiaria * diasCoberturaSugerida), totalComprasHistoricas = comprasTotalesPorCodigo[code] || 0, totalVentasHistoricas = DATABASE_STATE.filter(r => r.rawCode === code).reduce((sum, r) => sum + r.cantidad, 0), stockFisicoActual = Math.max(totalComprasHistoricas - totalVentasHistoricas, 0);
        let cantidadAComprar = stockRequeridoFuturo - stockFisicoActual; if (cantidadAComprar < 0) cantidadAComprar = 0;
        let badgeCritico = '<span class="badge bg-success">Seguro</span>'; if (stockFisicoActual <= 0) badgeCritico = '<span class="badge bg-danger">Quiebre</span>';
        tbody.innerHTML += `<tr><td class="font-monospace fw-bold">COD-${code}</td><td><strong>${p.nombre}</strong></td><td class="text-end font-monospace text-muted">${velocidadVentaDiaria.toFixed(2)} ud/d</td><td class="text-end font-monospace fw-bold">${stockRequeridoFuturo}</td><td class="text-end font-monospace text-info fw-bold">${stockFisicoActual}</td><td class="text-end font-monospace text-white fw-bold ${cantidadAComprar > 0 ? 'bg-success' : 'bg-secondary bg-opacity-25 text-dark'}">${cantidadAComprar}</td><td>${badgeCritico}</td></tr>`;
    });
    dtSimulationOrder = $('#tableSimulationOrder').DataTable({ destroy: true, pageLength: 10, dom: 'Bfrtip', buttons: [{ extend: 'excelHtml5', text: '<i class="fa-solid fa-file-excel me-1"></i> Generar Orden (Excel)', className: 'btn btn-info text-dark fw-bold btn-sm mt-2' }], order: [[5, 'desc']], language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' } });
}

// CONVERTIDOR RESPONSABLE DE MÁQUINA REAL
function convertRawTextToStagingPreview() {
    const rawText = document.getElementById('rawCsvPasteData').value.trim(); if(!rawText) return;
    const lines = rawText.split(/\r?\n/); STAGING_MEMORIA_TEMPORAL = []; let divisor = '\t'; if (!lines[0].includes('\t')) { divisor = lines[0].includes(';') ? ';' : ','; }
    for (let i = 0; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        let row = lines[i].split(divisor).map(cell => cell.trim().replace(/"/g, '')); if (row[0].toUpperCase().includes("FECHA") || row[1].toUpperCase().includes("STATUS")) continue;
        let rawDate = row[0] || "", estado = (row[1] || "ACEPTADA").toUpperCase().trim(), rawValor = row[2] || "0.00", codeStr = (row[3] || "").trim(), maquinaOrigenExcel = row[4] || "MAQUINA 1", tecnologia = row[6] || ""; if (estado !== "ACEPTADA") continue;
        
        let valorNumerico = parseFloat(rawValor.replace(/[^0-9,\.-]/g, '').replace(',', '.')) || 0; let isoDate = "2026-06-20", timeShort = "12:00";
        if (rawDate.includes(' ')) { let parts = rawDate.split(' '); timeShort = parts[1].substring(0, 5); let dateParts = parts[0].split(/[-/]/); if (dateParts.length === 3) isoDate = dateParts[0].length === 4 ? `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}` : `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;}
        
        let pago = "Otros"; if (maquinaOrigenExcel.toUpperCase().includes("EFECTIVO")) pago = "Efectivo"; else if (maquinaOrigenExcel.toUpperCase().includes("TARJETA")) pago = tecnologia.toUpperCase().includes("QR") ? ((i % 2 === 0) ? "Yape" : "Plin") : "Tarjeta";
        
        let maquinaRealNombre = row[4] && !row[4].toUpperCase().includes("EFECTIVO") && !row[4].toUpperCase().includes("TARJETA") ? row[4].toUpperCase() : "MAQUINA 1";
        let prodMeta = DICCIONARIO_PRODUCTOS[codeStr];
        STAGING_MEMORIA_TEMPORAL.push(enrichSaleRecord({
    id: `V_${i}_${Date.now()}`,
    fecha: isoDate,
    hora: timeShort,
    maquina: maquinaRealNombre,
    rawCode: codeStr,
    estado: estado,
    pago: pago,
    cantidad: 1,
    valor: valorNumerico
}));
    }
    const tbody = document.querySelector('#tableStagingPreview tbody'); tbody.innerHTML = '';
    STAGING_MEMORIA_TEMPORAL.forEach(r => { tbody.innerHTML += `<tr><td>${r.fecha}</td><td>${r.hora}</td><td><span class="badge bg-secondary">${r.maquina}</span></td><td>${r.codigo}</td><td><span class="badge bg-light text-dark border">${r.producto}</span></td><td><span class="badge bg-primary">${r.pago}</span></td><td class="text-end text-success fw-bold">S/ ${r.valor.toFixed(2)}</td></tr>`; });
    document.getElementById('stagingCardContainer').classList.remove('d-none');
}

function commitStagingToDashboard() {
    if (STAGING_MEMORIA_TEMPORAL.length === 0) return;

    if (confirm("¿Aprobar ventas del Excel? Se actualizarán ventas y reportes, pero se conservarán precios, compras, gastos y stock en máquina.")) {
        DATABASE_STATE = STAGING_MEMORIA_TEMPORAL.map(enrichSaleRecord);

        localStorage.setItem('v_bi_data', JSON.stringify(DATABASE_STATE));

        document.getElementById('rawCsvPasteData').value = '';
        document.getElementById('stagingCardContainer').classList.add('d-none');

        populateSelectors(DATABASE_STATE);
        buildFormSelectorsAutoComplete();

        renderDicMasterTable();
        renderInvoiceHistoryTable();
        renderGastosMasterTable();
        renderTelemetryMasterTable();

        processAndRenderAll();

        document.querySelector('#main-nav a[href="#dashboard-section"]').click();

        alert("Ventas actualizadas. Tus datos manuales se conservaron.");
    }
}

function updateMachineSelectorDropdown(data) {
    const machines = new Set(); data.forEach(r => { if(r.maquina) machines.add(r.maquina.toUpperCase()); });
    const mSel = document.getElementById('filterMachine'); if(!mSel) return;
    const currentM = mSel.value; mSel.innerHTML = '<option value="TODOS">Todas las Máquinas</option>';
    machines.forEach(m => mSel.innerHTML += `<option value="${m}">${m}</option>`); mSel.value = currentM ? currentM : 'TODOS';
}

function populateSelectors(data) {
    const payments = new Set(); data.forEach(r => { if(r.pago) payments.add(r.pago); });
    const pSel = document.getElementById('filterPayment'); if(pSel) { const currentP = pSel.value; pSel.innerHTML = '<option value="TODOS">Todos los Medios</option>'; payments.forEach(p => pSel.innerHTML += `<option value="${p}">${p}</option>`); pSel.value = currentP ? currentP : 'TODOS'; }
    updateMachineSelectorDropdown(data);
}

function processAndRenderAll() {
    DATABASE_STATE = DATABASE_STATE.map(enrichSaleRecord);

    const filtered = getFilteredSales();

    renderKPIs(filtered);
    renderMetaAnual(filtered);
    renderHistoryChart(filtered);
    renderPaymentsChart(filtered);
    renderTopProductsSection(filtered);
    renderAdvancedProducts(filtered);
    renderDataTableSection(filtered);
    renderStockKardexModule(filtered);
    renderSimulationOrderTable(filtered);
    renderTelemetryMasterTable();
    recalcularCuadroDeductorGastos();
}


function renderKPIs(data) {
    const totalSales = data.reduce((sum, r) => sum + r.valor, 0); const totalQty = data.reduce((sum, r) => sum + r.cantidad, 0);
    let gananciaRealExacta = 0; data.forEach(r => { const meta = DICCIONARIO_PRODUCTOS[r.rawCode]; if (meta) { gananciaRealExacta += (r.valor - meta.costo); } else { gananciaRealExacta += (r.valor * 0.40); } });
    const dates = data.map(r => r.fecha); const maxDate = dates.length > 0 ? dates.sort().pop() : ''; const todaySales = data.filter(r => r.fecha === maxDate).reduce((sum, r) => sum + r.valor, 0); const avgTicket = data.length > 0 ? (totalSales / data.length) : 0;
    document.getElementById('kpiTotalSales').innerText = `S/ ${totalSales.toFixed(2)}`; document.getElementById('kpiTodaySales').innerText = `S/ ${todaySales.toFixed(2)}`; document.getElementById('kpiTotalQty').innerText = totalQty; document.getElementById('kpiAvgTicket').innerText = `S/ ${avgTicket.toFixed(2)}`; document.getElementById('kpiTotalProfit').innerText = `S/ ${gananciaRealExacta.toFixed(2)}`;
}

function renderMetaAnual(data) {
    const META_ANUAL = 15000; const accumulated = data.reduce((sum, r) => sum + r.valor, 0); let totalProfit = 0; data.forEach(r => { const meta = DICCIONARIO_PRODUCTOS[r.rawCode]; if (meta) totalProfit += (r.valor - meta.costo); else totalProfit += (r.valor * 0.40); });
    const percentage = Math.min((accumulated / META_ANUAL) * 100, 100); const missing = Math.max(META_ANUAL - accumulated, 0);
    document.getElementById('metaPercentage').innerText = `${percentage.toFixed(1)}%`; document.getElementById('metaProgressBar').style.width = `${percentage}%`; document.getElementById('metaAccumulated').innerText = `S/ ${accumulated.toFixed(2)}`; document.getElementById('metaProfit').innerText = `S/ ${totalProfit.toFixed(2)}`; document.getElementById('metaMissing').innerText = `S/ ${missing.toFixed(2)}`;
}

function renderHistoryChart(data) {
    const canvas = document.getElementById('chartHistory'); if (!canvas) return;
    const ctx = canvas.getContext('2d'); const grouped = {}; data.forEach(r => { grouped[r.fecha] = (grouped[r.fecha] || 0) + r.valor; });
    let sortedDates = Object.keys(grouped).sort();
    if (chartHistory) chartHistory.destroy();
    chartHistory = new Chart(ctx, { type: 'line', data: { labels: sortedDates, datasets: [{ label: 'Ventas (S/)', data: sortedDates.map(d => grouped[d]), borderColor: '#1e40af', backgroundColor: 'rgba(59, 130, 246, 0.05)', fill: true, tension: 0.1 }] }, options: { responsive: true, maintainAspectRatio: false } });
}

/* Gráfico de Medios de Pago */
function renderPaymentsChart(data) {
    const canvas = document.getElementById('chartPayments'); if (!canvas) return;
    const ctx = canvas.getContext('2d'); const group = {}; data.forEach(r => { group[r.pago] = (group[r.pago] || 0) + r.valor; });
    if (chartPayments) chartPayments.destroy();
    chartPayments = new Chart(ctx, { type: 'doughnut', data: { labels: Object.keys(group), datasets: [{ data: Object.values(group), backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'] }] }, options: { responsive: true, maintainAspectRatio: false } });
}

function renderTopProductsSection(data) {
    const metrics = {}; data.forEach(r => { if(!metrics[r.codigo]) metrics[r.codigo] = { nombre: r.producto, qty: 0, total: 0 }; metrics[r.codigo].qty += r.cantidad; metrics[r.codigo].total += r.valor; });
    const sorted = Object.keys(metrics).map(c => ({ codigo: c, ...metrics[c] })).sort((a,b) => b.qty - a.qty).slice(0, 10);
    const tbody = document.querySelector('#tableTopProducts tbody'); if(tbody) { tbody.innerHTML = ''; sorted.forEach((p, idx) => { tbody.innerHTML += `<tr><td><span class="badge ${idx < 3 ? 'bg-warning text-dark' : 'bg-secondary'}">${idx + 1}</span></td><td class="font-monospace fw-bold">${p.codigo}</td><td>${p.nombre}</td><td class="text-end fw-bold">${p.qty}</td><td class="text-end text-success">S/ ${p.total.toFixed(2)}</td></tr>`; }); }
    const canvas = document.getElementById('chartTopProducts'); if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (chartTopProducts) chartTopProducts.destroy();
    chartTopProducts = new Chart(ctx, { type: 'bar', data: { labels: sorted.map(p => p.codigo), datasets: [{ label: 'Unidades', data: sorted.map(p => p.qty), backgroundColor: '#3b82f6' }] }, options: { responsive: true, maintainAspectRatio: false } });
}

function renderAdvancedProducts(data) {
    const metrics = {}; data.forEach(r => { if(!metrics[r.codigo]) metrics[r.codigo] = { nombre: r.producto, qty: 0, total: 0 }; metrics[r.codigo].qty += r.cantidad; metrics[r.codigo].total += r.valor; });
    const arr = Object.keys(metrics).map(c => ({ codigo: c, ...metrics[c] })); const menosVendidos = [...arr].sort((a,b) => a.qty - b.qty).slice(0, 5);
    const listMargen = Object.keys(DICCIONARIO_PRODUCTOS).map(code => { let p = DICCIONARIO_PRODUCTOS[code]; return { codigo: `COD-${code}`, nombre: p.nombre, margen: (p.precio - (p.costo || 0)) }; }).sort((a,b) => b.margen - a.margen).slice(0, 3);
    const comprasTotalesPorCodigo = {}; HISTORIAL_COMPRAS_LOTES.forEach(l => { comprasTotalesPorCodigo[l.rawCode] = (comprasTotalesPorCodigo[l.rawCode] || 0) + l.cantidad; });
    const listDebenVenderse = Object.keys(comprasTotalesPorCodigo).map(code => { const compras = comprasTotalesPorCodigo[code] || 0; const ventas = metrics[`COD-${code}`] ? metrics[`COD-${code}`].qty : 0; const stockRestante = compras - ventas; return { codigo: `COD-${code}`, nombre: DICCIONARIO_PRODUCTOS[code] ? DICCIONARIO_PRODUCTOS[code].nombre : 'Snack', stock: stockRestante }; }).sort((a,b) => b.stock - a.stock).slice(0, 3);
    const fillList = (id, items, badgeClass, suffix) => { const list = document.getElementById(id); if(!list) return; list.innerHTML = ''; items.forEach(p => { let val = suffix === 'S/' ? `S/ ${p.margen.toFixed(2)}` : (suffix === 'ud.' ? `${p.qty} ud.` : `${p.stock} ud.`); list.innerHTML += `<li class="list-group-item bg-transparent d-flex justify-content-between align-items-center px-0 py-1 small border-0"><span><strong>${p.codigo}</strong> <small class="text-muted">(${p.nombre})</small></span><span class="badge ${badgeClass}">${val}</span></li>`; }); };
    fillList('listProfitable', listMargen, 'bg-success', 'S/'); fillList('listLessSold', menosVendidos, 'bg-warning text-dark', 'ud.'); fillList('listNoMovement', listDebenVenderse, 'bg-danger', 'stock');
}

function renderStockKardexModule(data) {
    const sDate = document.getElementById('filterStartDate').value; const eDate = document.getElementById('filterEndDate').value;
    const ventasPorCodigo = {}; data.forEach(r => { const codeNum = r.codigo.replace('COD-', ''); ventasPorCodigo[codeNum] = (ventasPorCodigo[codeNum] || 0) + r.cantidad; });
    const comprasTotalesPorCodigo = {};
    HISTORIAL_COMPRAS_LOTES.forEach(l => {
        if (sDate && l.fecha_compra < sDate) return; if (eDate && l.fecha_compra > eDate) return;
        comprasTotalesPorCodigo[l.rawCode] = (comprasTotalesPorCodigo[l.rawCode] || 0) + l.cantidad;
    });
    const todosLosCodigos = new Set([...Object.keys(comprasTotalesPorCodigo), ...Object.keys(ventasPorCodigo)]);
    const tbody = document.querySelector('#tableStockKardex tbody'); if(!tbody) return; tbody.innerHTML = '';
    todosLosCodigos.forEach(code => {
        if(code === "" || code.includes('undefined') || code === "Cod Sel") return;
        const compras = comprasTotalesPorCodigo[code] || 0, ventas = ventasPorCodigo[code] || 0, stockActual = compras - ventas;
        let badgeAlerta = '<span class="badge bg-success">Abastecido</span>'; if (stockActual <= 0) badgeAlerta = '<span class="badge bg-danger">Quiebre</span>'; else if (stockActual <= 5) badgeAlerta = '<span class="badge bg-warning text-dark">Bajo Stock</span>';
        const meta = DICCIONARIO_PRODUCTOS[code];
        tbody.innerHTML += `<tr><td class="font-monospace fw-bold">COD-${code}</td><td><strong>${meta ? meta.nombre : 'No registrado'}</strong></td><td class="text-end font-monospace text-danger fw-bold">S/ ${(meta) ? meta.costo.toFixed(2) : '0.00'}</td><td class="text-end text-success font-monospace fw-bold">${compras}</td><td class="text-end text-danger font-monospace fw-bold">${ventas}</td><td class="text-end font-monospace fw-bold ${stockActual<=0?'text-danger':''}">${stockActual}</td><td>${badgeAlerta}</td></tr>`;
    });
}

function renderDataTableSection(data) {
    if (dtInstance) { dtInstance.clear(); dtInstance.rows.add(data); dtInstance.draw(); return; }
    dtInstance = $('#dtTransactions').DataTable({ data: data, columns: [ { data: 'fecha', defaultContent: "" }, { data: 'hora', defaultContent: "" }, { data: 'maquina', defaultContent: "" }, { data: 'codigo', defaultContent: "" }, { data: 'producto', defaultContent: "" }, { data: 'estado', defaultContent: "", render: () => `<span class="badge bg-success">ACEPTADA</span>` }, { data: 'pago', defaultContent: "" }, { data: 'cantidad', defaultContent: 0, className: 'text-end' }, { data: 'valor', defaultContent: 0, className: 'text-end', render: v => `S/ ${v.toFixed(2)}` } ], order: [[0, 'desc'], [1, 'desc']], pageLength: 10, dom: 'Bfrtip', buttons: [{ extend: 'excelHtml5', text: '<i class="fa-solid fa-file-excel me-1"></i> Exportar Ventas', className: 'btn btn-success btn-sm mt-2' }], language: { url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json' } });
}


