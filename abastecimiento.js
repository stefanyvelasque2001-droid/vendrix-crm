(function () {
    const CAPACIDAD_RESORTES = {
        "MAQUINA 1": {
            "01": 5, "03": 5, "05": 5, "07": 5, "09": 5,
            "11": 14, "12": 14, "13": 14, "14": 14, "15": 14, "16": 14, "17": 14, "18": 14, "19": 14, "20": 14,
            "21": 14, "22": 14, "23": 14, "24": 14, "25": 14, "26": 14, "27": 14, "28": 14, "29": 14, "30": 14,
            "31": 5, "32": 5, "33": 5, "34": 5, "35": 5, "36": 5, "37": 5, "38": 5, "39": 5, "40": 5,
            "41": 5, "42": 5, "43": 5, "44": 5, "45": 5, "46": 5, "47": 5, "48": 5, "49": 5, "50": 5,
            "51": 5, "52": 5, "53": 5, "54": 5, "55": 5, "56": 5, "57": 5, "58": 5, "59": 5, "60": 5
        },
        "MAQUINA 2": {
            "11": 5, "13": 5, "15": 5,
            "20": 10, "21": 10, "24": 10, "25": 10,
            "23": 6,
            "31": 10, "32": 10, "33": 10, "34": 10, "35": 10,
            "40": 10, "41": 10, "42": 10, "43": 10, "44": 10, "45": 10,
            "50": 5, "51": 5, "52": 5, "53": 5, "54": 5, "55": 5,
            "60": 5, "61": 5, "62": 5, "63": 5, "64": 5, "65": 5
        }
    };

    const DEFAULT_PRODUCTS = {
        "55": { nombre: "INKA KOLA" }, "56": { nombre: "COCA COLA" }, "58": { nombre: "CIELO MANZANA" },
        "59": { nombre: "SPRITE" }, "51": { nombre: "HEY FIT CAMU CAMU" }, "53": { nombre: "HEY FIT HIERBA LUISA" },
        "54": { nombre: "HEY FIT COCA COLA" }, "41": { nombre: "GATORADE" }, "50": { nombre: "AGUA SAN MATEO" },
        "57": { nombre: "CIELO LIMON" }, "31": { nombre: "ROSCA" }, "32": { nombre: "PALITOS DE AJONJOLI" },
        "33": { nombre: "NICK TACO" }, "34": { nombre: "NICK TACO" }, "35": { nombre: "RITZ TACO" },
        "38": { nombre: "ROSCA" }, "42": { nombre: "SEVEN UP" }, "43": { nombre: "CONCORDIA NARANJA" },
        "44": { nombre: "CONCORDIA FRESA" }, "45": { nombre: "CONCORDIA PIÑA" }, "46": { nombre: "GUARANITA" },
        "47": { nombre: "SAN MATEO CON GAS" }, "21": { nombre: "CHOCOSODA" }, "22": { nombre: "PICARAS" },
        "23": { nombre: "MOROCHAS" }, "24": { nombre: "QUINOA" }, "26": { nombre: "TENTACIÓN DE CHOCOLATE" },
        "28": { nombre: "DONUTS" }, "29": { nombre: "CLUB SOCIAL" }, "30": { nombre: "GLACITAS" },
        "36": { nombre: "CHIFLES" }, "37": { nombre: "FRUTA MIXTA" }, "39": { nombre: "CHIPS GALLETA" },
        "5": { nombre: "CUATES PICANTES" }, "05": { nombre: "CUATES PICANTES" }, "27": { nombre: "INTEGRALES DE MIEL" },
        "40": { nombre: "SODA LINE" }, "49": { nombre: "AGUA CIELO" }, "60": { nombre: "CIELO NARANJA" },
        "19": { nombre: "RITZ PEQUEÑO" }, "25": { nombre: "VAINILLA" }, "48": { nombre: "AGUA SWORD" },
        "52": { nombre: "HEY FIT COCO" }, "9": { nombre: "CHEETOS PICANTES" }, "09": { nombre: "CHEETOS PICANTES" },
        "11": { nombre: "TRIDENT" }, "14": { nombre: "CARAMELO FULL" }, "15": { nombre: "SUBLIME" },
        "13": { nombre: "CHIPS GALLETA" }, "18": { nombre: "CASINO" }, "01": { nombre: "CHIFLES" },
        "17": { nombre: "BLACK OUT 6 UND" }, "3": { nombre: "TIKTOK" }, "03": { nombre: "TIKTOK" },
        "7": { nombre: "CHIZITO" }, "07": { nombre: "CHIZITO" }, "16": { nombre: "BLACK OUT 4UND" },
        "1": { nombre: "INKACHIPS SAL" }, "12": { nombre: "SODA V" }, "20": { nombre: "RELLENITAS" }
    };

    const state = {
        sales: [],
        catalog: {},
        restocks: [],
        drafts: {},
        view: "STOCK"
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        loadState();
        buildMachines();
        buildMachineTabs();
        bindEvents();
        render();
    }

    function bindEvents() {
        document.getElementById("machineSelect").addEventListener("change", () => {
            updateMachineTabs();
            render();
        });
        document.getElementById("searchInput").addEventListener("input", render);
        document.getElementById("statusFilter").addEventListener("change", render);
        document.getElementById("btnRestockAll").addEventListener("click", restockVisibleMachine);
        document.getElementById("btnCopyWhatsapp").addEventListener("click", copyPendingText);
        document.getElementById("btnExportCsv").addEventListener("click", exportCsv);
        document.getElementById("salesFileInput").addEventListener("change", handleSalesFile);
        document.getElementById("btnProcessPaste").addEventListener("click", processPastedSales);
        document.querySelectorAll("[data-view]").forEach(button => {
            button.addEventListener("click", () => {
                state.view = button.dataset.view;
                updateViewTabs();
                render();
            });
        });
    }

    function loadState() {
        state.sales = safeJson(localStorage.getItem("v_bi_data"), []);
        state.catalog = { ...DEFAULT_PRODUCTS, ...safeJson(localStorage.getItem("v_bi_dic"), {}) };
        state.restocks = safeJson(localStorage.getItem("v_bi_tel"), []);
    }

    function saveRestocks() {
        localStorage.setItem("v_bi_tel", JSON.stringify(state.restocks));
        document.getElementById("syncStatus").textContent = `Guardado ${formatDateTime(new Date())}`;
    }

    function buildMachines() {
        const select = document.getElementById("machineSelect");
        select.innerHTML = "";
        Object.keys(CAPACIDAD_RESORTES).forEach(machine => {
            select.innerHTML += `<option value="${machine}">${machine}</option>`;
        });
    }

    function buildMachineTabs() {
        const tabs = document.getElementById("machineTabs");
        tabs.innerHTML = Object.keys(CAPACIDAD_RESORTES).map(machine => `
            <button type="button" class="machine-tab" data-machine="${machine}">
                <i class="fa-solid fa-store"></i> ${machine}
            </button>
        `).join("");
        tabs.querySelectorAll("[data-machine]").forEach(button => {
            button.addEventListener("click", () => {
                document.getElementById("machineSelect").value = button.dataset.machine;
                updateMachineTabs();
                render();
            });
        });
        updateMachineTabs();
    }

    function updateMachineTabs() {
        const selected = document.getElementById("machineSelect").value;
        document.querySelectorAll(".machine-tab").forEach(tab => {
            tab.classList.toggle("active", tab.dataset.machine === selected);
        });
    }

    function normalizeCode(code) {
        return String(code || "").replace("COD-", "").trim();
    }

    function normalizeMachine(machine) {
        return String(machine || "MAQUINA 1").trim().toUpperCase();
    }

    function makeCatalogKey(machine, code) {
        return `${normalizeMachine(machine)}||${normalizeCode(code)}`;
    }

    function getProduct(machine, code) {
        const rawCode = normalizeCode(code);
        const noZeroCode = String(Number(rawCode));
        return state.catalog[makeCatalogKey(machine, rawCode)] ||
            state.catalog[makeCatalogKey(machine, noZeroCode)] ||
            state.catalog[rawCode] ||
            state.catalog[noZeroCode] ||
            DEFAULT_PRODUCTS[rawCode] ||
            DEFAULT_PRODUCTS[noZeroCode] ||
            { nombre: `Resorte COD-${rawCode}` };
    }

    function codesMatch(a, b) {
        const first = normalizeCode(a);
        const second = normalizeCode(b);
        return first === second || String(Number(first)) === String(Number(second));
    }

    function latestRestock(machine, code) {
        const targetMachine = normalizeMachine(machine);
        const targetCode = normalizeCode(code);
        return [...state.restocks]
            .filter(item => normalizeMachine(item.maquina) === targetMachine && codesMatch(item.rawCode, targetCode))
            .sort((a, b) => String(`${b.fecha_carga || ""} ${b.hora_carga || ""}`).localeCompare(String(`${a.fecha_carga || ""} ${a.hora_carga || ""}`)))[0] || null;
    }

    function salesAfter(machine, code, date, time = "") {
        if (!date) return 0;
        const targetMachine = normalizeMachine(machine);
        const targetCode = normalizeCode(code);
        const restockStamp = `${date} ${time || "00:00"}`;
        return state.sales
            .filter(row => normalizeMachine(row.maquina) === targetMachine && codesMatch(row.rawCode || row.codigo, targetCode) && saleStamp(row) >= restockStamp)
            .reduce((sum, row) => sum + Number(row.cantidad || 1), 0);
    }

    function getRows() {
        const machine = document.getElementById("machineSelect").value;
        const search = document.getElementById("searchInput").value.trim().toUpperCase();
        const status = document.getElementById("statusFilter").value;

        return Object.keys(CAPACIDAD_RESORTES[machine] || {}).sort((a, b) => Number(a) - Number(b)).map(code => {
            const capacity = CAPACIDAD_RESORTES[machine][code];
            const restock = latestRestock(machine, code);
            const sold = salesAfter(machine, code, restock?.fecha_carga, restock?.hora_carga);
            const estimated = restock ? Math.max(Number(restock.cantidad_inyectada || capacity) - sold, 0) : 0;
            const key = makeCatalogKey(machine, code);
            const current = state.drafts[key] ?? estimated;
            const product = getProduct(machine, code);
            const rowStatus = getStatus(estimated, capacity, !!restock);
            return { machine, code, capacity, restock, sold, estimated, current, product, status: rowStatus };
        }).filter(row => {
            const text = `${row.code} ${row.product.nombre}`.toUpperCase();
            if (search && !text.includes(search)) return false;
            if (status !== "TODOS" && row.status.key !== status) return false;
            return true;
        });
    }

    function getStatus(stock, capacity, hasRestock) {
        if (!hasRestock) return { key: "SIN_FECHA", label: "Sin fecha", className: "status-empty" };
        if (stock <= 2) return { key: "URGENTE", label: "Urgente", className: "status-urgent" };
        if (stock <= 5 && stock < capacity) return { key: "MEDIO", label: "Pronto", className: "status-medium" };
        return { key: "OK", label: "OK", className: "status-ok" };
    }

    function render() {
        loadState();
        const rows = getRows();
        renderSummary(rows);
        document.getElementById("pendingTabCount").textContent = rows.filter(needsRestock).length;
        updateViewTabs();
        if (state.view === "PENDIENTES") renderPendingList(rows.filter(needsRestock));
        else renderCards(rows);
    }

    function renderSummary(rows) {
        document.getElementById("metricSprings").textContent = rows.length;
        document.getElementById("metricUrgent").textContent = rows.filter(needsRestock).length;
        document.getElementById("metricLastSale").textContent = latestSaleDate(rows[0]?.machine) || "-";
        const last = rows.map(row => row.restock).filter(Boolean).sort((a, b) => String(b.fecha_carga).localeCompare(String(a.fecha_carga)))[0];
        document.getElementById("metricLastRestock").textContent = last ? formatShortDate(last.fecha_carga) : "-";
    }

    function renderCards(rows) {
        const grid = document.getElementById("cardsGrid");
        grid.className = "cards-grid";
        grid.innerHTML = rows.map(row => productCard(row)).join("");
        grid.querySelectorAll("[data-action]").forEach(button => {
            button.addEventListener("click", () => handleCardAction(button.dataset.action, button.dataset.machine, button.dataset.code));
        });
        bindPhotoInputs(grid);
    }

    function updateViewTabs() {
        document.querySelectorAll(".view-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.view === state.view));
    }

    function needsRestock(row) {
        return row.status.key === "URGENTE" || row.status.key === "MEDIO" || row.status.key === "SIN_FECHA";
    }

    function productCard(row) {
        const percent = row.capacity ? Math.min((row.estimated / row.capacity) * 100, 100) : 0;
        const last = row.restock ? `${formatShortDate(row.restock.fecha_carga)} ${row.restock.hora_carga || ""}`.trim() : "Aún no marcado";
        return `
            <article class="product-card">
                <div class="product-top">
                    <div class="product-heading">
                        ${productPhoto(row)}
                        <div>
                        <h2 class="product-name">${escapeHtml(row.product.nombre)}</h2>
                        <div class="last-date">Última carga: ${row.restock ? `${row.restock.cantidad_inyectada || 0} und · ` : ""}${escapeHtml(last)}</div>
                        </div>
                    </div>
                    <div class="side-badges">
                        <span class="code-badge">COD-${escapeHtml(row.code)}</span>
                        <span class="max-badge">Max ${row.capacity}</span>
                    </div>
                </div>
                <div class="main-stock">
                    <div><span>Estado actual</span><strong>${row.estimated} und</strong></div>
                    <small>Última: ${row.restock?.cantidad_inyectada || 0} und<br>Vendidas: ${row.sold}</small>
                </div>
                <div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>
                <span class="status-pill ${row.status.className}">${row.status.label}</span>
                <div class="stepper">
                    <button class="secondary-action" data-action="minus" data-machine="${row.machine}" data-code="${row.code}">-</button>
                    <div class="stock-now">${row.current} und</div>
                    <button class="secondary-action" data-action="plus" data-machine="${row.machine}" data-code="${row.code}">+</button>
                </div>
                <div class="card-actions">
                    <button class="save" data-action="save" data-machine="${row.machine}" data-code="${row.code}">Abastecido</button>
                    <button class="full" title="Llenar al máximo" data-action="full" data-machine="${row.machine}" data-code="${row.code}"><i class="fa-solid fa-fill-drip"></i></button>
                </div>
            </article>
        `;
    }

    function productPhoto(row, compact = false) {
        const image = row.product.imagen
            ? `<img src="${escapeHtml(row.product.imagen)}" alt="${escapeHtml(row.product.nombre)}">`
            : `<i class="fa-solid fa-box-open"></i>`;
        return `<div class="product-photo ${compact ? "compact" : ""}">
            ${image}
            <label class="photo-control" title="Agregar o cambiar foto">
                <input type="file" accept="image/*" data-photo="true" data-machine="${row.machine}" data-code="${row.code}">
                <i class="fa-solid fa-camera"></i>
            </label>
        </div>`;
    }

    function renderPendingList(rows) {
        const grid = document.getElementById("cardsGrid");
        grid.className = "pending-list";
        if (!rows.length) {
            grid.innerHTML = `<div class="empty-state"><i class="fa-solid fa-circle-check"></i><strong>Todo está al día</strong><span>No hay productos rojos ni amarillos para esta máquina.</span></div>`;
            return;
        }
        grid.innerHTML = rows.sort((a, b) => priorityOrder(a) - priorityOrder(b) || a.estimated - b.estimated).map(row => `
            <article class="pending-card ${row.status.className}">
                ${productPhoto(row, true)}
                <div class="pending-product"><span class="code-badge">COD-${escapeHtml(row.code)}</span><h2>${escapeHtml(row.product.nombre)}</h2><span>${row.status.label}</span></div>
                <div><span>Última carga</span><strong>${row.restock?.cantidad_inyectada || 0} und</strong><small>${row.restock ? formatShortDate(row.restock.fecha_carga) : "Sin registro"}</small></div>
                <div><span>Actual</span><strong>${row.estimated} und</strong><small>Máx. ${row.capacity} und</small></div>
                <div><span>Abastecer</span><strong>${Math.max(row.capacity - row.estimated, 0)} und</strong><small>${recommendedRestockDate(row)}</small></div>
            </article>
        `).join("");
        bindPhotoInputs(grid);
    }

    function priorityOrder(row) {
        return row.status.key === "URGENTE" || row.status.key === "SIN_FECHA" ? 0 : 1;
    }

    function recommendedRestockDate(row) {
        if (row.status.key === "URGENTE" || row.status.key === "SIN_FECHA") return `Reponer: hoy (${formatShortDate(todayISODate())})`;
        const restockDate = new Date(`${row.restock.fecha_carga}T${row.restock.hora_carga || "00:00"}`);
        const elapsedDays = Math.max((Date.now() - restockDate.getTime()) / 86400000, 1);
        const dailySales = row.sold / elapsedDays;
        if (!dailySales) return "Revisar en 3 días";
        const daysUntilUrgent = Math.max(Math.ceil((row.estimated - 2) / dailySales), 1);
        const target = new Date();
        target.setDate(target.getDate() + daysUntilUrgent);
        return `Reponer: ${formatShortDate(todayISODate(target))}`;
    }

    function bindPhotoInputs(container) {
        container.querySelectorAll("[data-photo]").forEach(input => {
            input.addEventListener("change", async () => {
                const file = input.files?.[0];
                if (!file) return;
                try {
                    const image = await compressProductImage(file);
                    const key = makeCatalogKey(input.dataset.machine, input.dataset.code);
                    const existing = getProduct(input.dataset.machine, input.dataset.code);
                    state.catalog[key] = { ...existing, imagen: image };
                    localStorage.setItem("v_bi_dic", JSON.stringify(state.catalog));
                    document.getElementById("syncStatus").textContent = "Foto guardada y sincronizada";
                    render();
                } catch {
                    alert("No se pudo usar esa foto. Prueba con una imagen JPG o PNG.");
                }
            });
        });
    }

    function compressProductImage(file) {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith("image/")) return reject(new Error("Archivo no válido"));
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                const image = new Image();
                image.onerror = reject;
                image.onload = () => {
                    const maxSize = 360;
                    const scale = Math.min(maxSize / image.width, maxSize / image.height, 1);
                    const canvas = document.createElement("canvas");
                    canvas.width = Math.max(1, Math.round(image.width * scale));
                    canvas.height = Math.max(1, Math.round(image.height * scale));
                    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL("image/jpeg", 0.78));
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function handleCardAction(action, machine, code) {
        const key = makeCatalogKey(machine, code);
        const capacity = CAPACIDAD_RESORTES[machine][code];
        const row = getRows().find(item => item.machine === machine && item.code === code);
        const current = state.drafts[key] ?? row?.estimated ?? 0;

        if (action === "plus") state.drafts[key] = Math.min(current + 1, capacity);
        if (action === "minus") state.drafts[key] = Math.max(current - 1, 0);
        if (action === "full") state.drafts[key] = capacity;
        if (action === "save") saveRestock(machine, code, current);
        renderCards(getRows());
    }

    function saveRestock(machine, code, qty) {
        const now = new Date();
        const payload = {
            id_tel: `T-${Date.now()}`,
            maquina: normalizeMachine(machine),
            rawCode: normalizeCode(code),
            fecha_carga: todayISODate(now),
            hora_carga: now.toTimeString().slice(0, 5),
            cantidad_inyectada: Number(qty || 0)
        };
        state.restocks.push(payload);
        delete state.drafts[makeCatalogKey(machine, code)];
        saveRestocks();
        render();
    }

    function restockVisibleMachine() {
        const machine = document.getElementById("machineSelect").value;
        if (!confirm(`¿Marcar todos los resortes visibles de ${machine} como abastecidos al máximo?`)) return;
        const now = new Date();
        getRows().forEach(row => {
            state.restocks.push({
                id_tel: `T-${Date.now()}-${row.code}`,
                maquina: row.machine,
                rawCode: row.code,
                fecha_carga: todayISODate(now),
                hora_carga: now.toTimeString().slice(0, 5),
                cantidad_inyectada: row.capacity
            });
            delete state.drafts[makeCatalogKey(row.machine, row.code)];
        });
        saveRestocks();
        render();
    }

    async function copyPendingText() {
        const machine = document.getElementById("machineSelect").value;
        const rows = getRows().filter(needsRestock);
        const lines = [`${machine} - productos por reponer`, ""].concat(rows.map(row => `COD-${row.code} | ${row.product.nombre} | stock ${row.estimated}/${row.capacity} | ${row.status.label}`));
        const text = lines.join("\n");
        await navigator.clipboard.writeText(text);
        document.getElementById("syncStatus").textContent = "Lista copiada para WhatsApp";
    }

    function exportCsv() {
        const rows = getRows();
        const csv = ["Maquina,Codigo,Producto,Stock estimado,Vendido,Capacidad,Estado,Ultima reposicion"]
            .concat(rows.map(row => [
                row.machine,
                `COD-${row.code}`,
                row.product.nombre,
                row.estimated,
                row.sold,
                row.capacity,
                row.status.label,
                row.restock?.fecha_carga || ""
            ].map(csvCell).join(",")))
            .join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `abastecimiento-${document.getElementById("machineSelect").value}.csv`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function processPastedSales() {
        const input = document.getElementById("salesPasteInput");
        const rows = parseDelimitedSales(input.value);
        const result = mergeSales(rows);
        input.value = "";
        document.getElementById("syncStatus").textContent = `Ventas cargadas: ${result.added} nuevas`;
        render();
    }

    function handleSalesFile(event) {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
            const name = file.name.toLowerCase();
            let rows = [];
            if ((name.endsWith(".xlsx") || name.endsWith(".xls")) && window.XLSX) {
                const workbook = XLSX.read(loadEvent.target.result, { type: "array", cellDates: true });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                rows = XLSX.utils.sheet_to_json(sheet, { defval: "" }).map(mapObjectSaleRow).filter(Boolean);
            } else {
                rows = parseDelimitedSales(String(loadEvent.target.result || ""));
            }
            const result = mergeSales(rows);
            document.getElementById("syncStatus").textContent = `Ventas cargadas: ${result.added} nuevas`;
            event.target.value = "";
            render();
        };
        if (file.name.toLowerCase().endsWith(".xlsx") || file.name.toLowerCase().endsWith(".xls")) reader.readAsArrayBuffer(file);
        else reader.readAsText(file);
    }

    function mergeSales(rows) {
        const current = safeJson(localStorage.getItem("v_bi_data"), []);
        const existing = new Set(current.map(saleSignature));
        let added = 0;
        rows.filter(Boolean).forEach(row => {
            if (!row.fecha || !row.rawCode) return;
            const signature = saleSignature(row);
            if (existing.has(signature)) return;
            existing.add(signature);
            current.push(row);
            added++;
        });
        state.sales = current;
        localStorage.setItem("v_bi_data", JSON.stringify(current));
        return { added };
    }

    function parseDelimitedSales(text) {
        const clean = String(text || "").trim();
        if (!clean) return [];
        const lines = clean.split(/\r?\n/).filter(Boolean);
        const delimiter = lines[0].includes("\t") ? "\t" : (lines[0].includes(";") ? ";" : ",");
        const firstCells = lines[0].split(delimiter).map(cell => cell.trim());
        const hasHeader = firstCells.map(normalizeHeader).some(cell => /fecha|status|estado|codigo|cod|valor|monto|importe|maquina|machine|terminal|equipo|ubicacion|locacion/.test(cell));
        const headers = hasHeader ? firstCells : ["fecha", "estado", "valor", "codigo", "maquina", "extra", "tecnologia"];
        const dataLines = hasHeader ? lines.slice(1) : lines;
        return dataLines.map(line => {
            const cells = line.split(delimiter).map(cell => cell.trim().replace(/^"|"$/g, ""));
            const obj = {};
            headers.forEach((header, index) => obj[header] = cells[index] || "");
            return mapObjectSaleRow(obj);
        }).filter(Boolean);
    }

    function mapObjectSaleRow(obj) {
        const fechaRaw = pickValue(obj, ["fecha", "date", "fecha hora", "fecha de venta"]);
        const estado = String(pickValue(obj, ["status", "estado"]) || "ACEPTADA").toUpperCase();
        if (estado && estado !== "ACEPTADA") return null;
        const valor = parseMoney(pickValue(obj, ["valor", "monto", "importe", "total"]));
        const rawCode = normalizeCode(pickValue(obj, ["cod sel", "codsel", "codigo", "código", "code", "casilla"]));
        const machineRaw = pickValue(obj, ["maquina", "máquina", "machine", "terminal", "equipo", "dispositivo", "ubicacion", "ubicación", "locacion", "locación", "nombre maquina", "nombre máquina"]);
        const machine = extractMachineName(machineRaw, document.getElementById("machineSelect").value);
        const parsed = parseFlexibleDate(fechaRaw);
        const product = getProduct(machine, rawCode);
        return {
            fecha: parsed.date,
            hora: parsed.time,
            maquina: machine,
            rawCode,
            codigo: `COD-${rawCode}`,
            producto: product.nombre,
            estado: "ACEPTADA",
            pago: String(pickValue(obj, ["pago", "medio", "medio de pago", "tecnologia", "tecnología"]) || "Otros"),
            cantidad: 1,
            valor
        };
    }

    function pickValue(obj, names) {
        const entries = Object.entries(obj || {});
        for (const name of names) {
            const found = entries.find(([key]) => normalizeHeader(key) === normalizeHeader(name));
            if (found) return found[1];
        }
        for (const name of names) {
            const found = entries.find(([key]) => normalizeHeader(key).includes(normalizeHeader(name)));
            if (found) return found[1];
        }
        return "";
    }

    function normalizeHeader(value) {
        return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
    }

    function extractMachineName(value, fallback) {
        const text = normalizeHeader(value).toUpperCase();
        if (/\b(MAQUINA|MAQ|M)\s*(0?1|UNO)\b/.test(text) || /^(0?1)$/.test(text)) return "MAQUINA 1";
        if (/\b(MAQUINA|MAQ|M)\s*(0?2|DOS)\b/.test(text) || /^(0?2)$/.test(text)) return "MAQUINA 2";

        const isPayment = /EFECTIVO|TARJETA|YAPE|PLIN|QR|VISA|MASTERCARD|NIUBIZ/.test(text);
        if (!text || isPayment) return normalizeMachine(fallback || "MAQUINA 1");
        return normalizeMachine(value);
    }

    function parseFlexibleDate(value) {
        if (value instanceof Date && !isNaN(value)) return { date: todayISODate(value), time: value.toTimeString().slice(0, 5) };
        const text = String(value || "").trim();
        const parts = text.split(/\s+/);
        const dateText = parts[0] || "";
        const time = (parts[1] || "00:00").slice(0, 5);
        const dateParts = dateText.split(/[\/-]/);
        if (dateParts.length === 3) {
            if (dateParts[0].length === 4) return { date: `${dateParts[0]}-${dateParts[1].padStart(2, "0")}-${dateParts[2].padStart(2, "0")}`, time };
            return { date: `${dateParts[2]}-${dateParts[1].padStart(2, "0")}-${dateParts[0].padStart(2, "0")}`, time };
        }
        const parsed = new Date(text);
        if (!isNaN(parsed)) return { date: todayISODate(parsed), time: parsed.toTimeString().slice(0, 5) };
        return { date: "", time: "" };
    }

    function parseMoney(value) {
        return Number(String(value || "0").replace(/[^0-9,\.-]/g, "").replace(",", ".")) || 0;
    }

    function saleStamp(row) {
        return `${row.fecha || ""} ${String(row.hora || "00:00").slice(0, 5)}`;
    }

    function saleSignature(row) {
        return `${row.fecha}|${row.hora}|${normalizeMachine(row.maquina)}|${normalizeCode(row.rawCode || row.codigo)}|${Number(row.valor || 0).toFixed(2)}`;
    }

    function latestSaleDate(machine) {
        const targetMachine = normalizeMachine(machine || document.getElementById("machineSelect").value);
        const last = state.sales
            .filter(row => normalizeMachine(row.maquina) === targetMachine)
            .sort((a, b) => saleStamp(b).localeCompare(saleStamp(a)))[0];
        if (!last) return "-";
        return `${formatShortDate(last.fecha)} ${String(last.hora || "").slice(0, 5)}`.trim();
    }

    function todayISODate(date = new Date()) {
        const offset = date.getTimezoneOffset();
        return new Date(date.getTime() - (offset * 60000)).toISOString().slice(0, 10);
    }

    function formatShortDate(value) {
        if (!value) return "-";
        const parts = String(value).split("-");
        return parts.length === 3 ? `${parts[2]}/${parts[1]}` : value;
    }

    function formatDateTime(date) {
        return `${todayISODate(date)} ${date.toTimeString().slice(0, 5)}`;
    }

    function safeJson(value, fallback) {
        try { return value ? JSON.parse(value) : fallback; }
        catch { return fallback; }
    }

    function escapeHtml(value) {
        return String(value || "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
    }

    function csvCell(value) {
        return `"${String(value ?? "").replace(/"/g, '""')}"`;
    }
})();
