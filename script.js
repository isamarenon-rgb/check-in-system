const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxVxksslCAdSwHIC4opgEVNWBGxzT1D6ZKNbaHeosYCw5h0h34hWjS5cWPexU46XyYqFg/exec";

// ข้อมูลนักเรียน ม.1 (ตัวอย่าง)
const studentMaster = [
    { grade: 'M1', names: ["เด็กหญิง กมลรัตน์ คำพงษ์", "เด็กหญิง กัญญาณัฐ คำเฝ้า", "เด็กหญิง กิตยา ตระกูลพิทักษ์กิจ", "เด็กหญิง ชญานิศ จันต๊ะ", "เด็กหญิง ชนากานต์ อินทิยา", "เด็กหญิง ชนิดาภา จักรแก้ว", "เด็กหญิง ฐิติวรดา เวชภูนนท์", "เด็กหญิง ณัฏฐณิชา นันท์ชัย", "เด็กหญิง ธนพล คำเรือง", "เด็กหญิง ธิดาวรรณ ปันคำ", "เด็กหญิง บัณฑิตา ดวงใจ", "เด็กหญิง พรพิมล คำมี", "เด็กหญิง พิชญธิดา แซ่เปี่ยน", "เด็กหญิง มีนารัตน์ พรมโน", "เด็กหญิง ศุกร์ศิริ แซ่ลี", "เด็กหญิง สาธิตา แซ่จ่าว", "เด็กชาย กฤษณกันต์ แซ่จ่าว", "เด็กชาย ชนาธิป อินทิยา", "เด็กชาย ณภรัตน์ แซ่ผ่าน", "เด็กชาย ธนภัทร หาสุข", "เด็กชาย ปฏิพล พรมคำอ้าย", "เด็กชาย ปรัตถ์ รุ่งเรือง", "เด็กชาย ปิยศักดิ์ ศรชัย", "เด็กชาย พชรดนัย ต๊ะวิไชย", "เด็กชาย รัชชานนท์ โยธการี", "เด็กชาย วรวี แซ่เฮ้อ", "เด็กชาย ศักดิ์กริน แสงคำ"] },
    { grade: 'M2', names: ["นร. ม.2 คนที่ 1", "นร. ม.2 คนที่ 2"] },
    { grade: 'M3', names: ["นร. ม.3 คนที่ 1"] },
    { grade: 'M4', names: ["นร. ม.4 คนที่ 1"] },
    { grade: 'M5', names: ["นร. ม.5 คนที่ 1"] },
    { grade: 'M6', names: ["นร. ม.6 คนที่ 1"] }
];

let curGrade = '';
let tempCheck = {};
let allSt = [];

studentMaster.forEach(g => g.names.forEach((n, i) => allSt.push({ id: `${g.grade}-${i+1}`, no: i+1, name: n, grade: g.grade })));

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    window.scrollTo(0,0);
}

window.handleLogin = () => {
    const pin = document.getElementById('pinInput').value;
    if(pin === '1234') showPage('gradePage');
    else document.getElementById('loginError').innerText = 'รหัสผ่านไม่ถูกต้อง';
};

window.handleLogout = () => { document.getElementById('pinInput').value = ''; showPage('loginPage'); };
window.goBack = () => showPage('gradePage');

window.selectGrade = (g) => {
    curGrade = g;
    tempCheck = {};
    document.getElementById('targetGrade').innerText = `ชั้นมัธยมศึกษาปีที่ ${g.replace('M','')}`;
    renderList();
    showPage('attendancePage');
};

function renderList() {
    const container = document.getElementById('studentList');
    container.innerHTML = '';
    allSt.filter(s => s.grade === curGrade).forEach(s => {
        const val = tempCheck[s.id] || 'present';
        const row = document.createElement('div');
        row.className = 'st-row';
        row.innerHTML = `<strong>#${s.no} ${s.name}</strong>
            <div class="status-btn-group">
                <button onclick="setStatus('${s.id}','present')" class="${val==='present'?'active-p':''}">มา</button>
                <button onclick="setStatus('${s.id}','late')" class="${val==='late'?'active-l':''}">สาย</button>
                <button onclick="setStatus('${s.id}','absent')" class="${val==='absent'?'active-a':''}">ขาด</button>
                <button onclick="setStatus('${s.id}','leave')" class="${val==='leave'?'active-v':''}">ลา</button>
            </div>`;
        container.appendChild(row);
    });
}

window.setStatus = (id, s) => { tempCheck[id] = s; renderList(); };

window.confirmSave = async () => {
    const log = { date: new Date().toLocaleDateString('th-TH'), time: new Date().toLocaleTimeString('th-TH'), grade: curGrade, data: tempCheck };
    try {
        await fetch(WEB_APP_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(log) });
        alert('บันทึกเรียบร้อย'); showPage('gradePage');
    } catch (e) { alert('บันทึกผิดพลาด'); }
};

setInterval(() => {
    const el = document.getElementById('digitalClock');
    if(el) el.innerText = new Date().toLocaleTimeString('th-TH');
}, 1000);
