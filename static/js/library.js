// ファイル出力
const output = () => {
    const table = document.getElementById('dataTable')
    const escaped = /,|\r?\n|\r|"/;
    const e = /"/g;
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF])
    const csv = []
    const row = []

    for (let r = 0; r < table.rows.length; r++) {
        row.length = 0
        for (let c = 0; c < table.rows[r].cells.length; c++) {
            const field = table.rows[r].cells[c].textContent
            row.push(escaped.test(field) ? '"' + field.replace(e, '""') + '"' : field)
        }
        csv.push(row.join(','))
    }
    const blob = new Blob([bom, csv.join('\n')], {
        'type': 'text/csv'
    })
    const a = document.getElementById('output_btn')
    a.download = 'output.csv'
    a.href = window.URL.createObjectURL(blob)

}

// カンマ区切りを連想配列に変換
function createArray(output_text) {
    let result = [];
    for (const line of output_text) {
        result.push(line.split(/,/))
    }
    return result;
}

// テーブル可
function createTable(result) {
    const resultTable = document.getElementById("resultTable");
    result.forEach((line) => {
        const tr = document.createElement("tr");
        resultTable.appendChild(tr);
        const objArray = Object.entries(line);
        objArray.forEach((arr) => {
            const td = document.createElement("td");
            var log_msg = "";
            var log_msg_body = "";
            if (arr[1].indexOf("\"") != -1) {
                log_msg = arr[1].split(/\r/)
                for (const msg of log_msg) {
                    log_msg_body += msg.replace("\"", "").replace("\"", "") + "<br>"
                    td.innerHTML = log_msg_body;
                }
            } else {
                td.textContent = arr[1];
            }
            // 改行してるデータをtdに入れる
            tr.appendChild(td);
        });
    });
}

const clearTable = () => {
    const resultTable = document.getElementById("resultTable");
    resultTable.remove()
}