const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxVxksslCAdSwHIC4opgEVNWBGxzT1D6ZKNbaHeosYCw5h0h34hWjS5cWPexU46XyYqFg/exec";

const studentMaster = [
    { 
        grade: 'M1', 
        names: [
            "เด็กหญิง กมลรัตน์ คำพงษ์", "เด็กหญิง กัญญาณัฐ คำเฝ้า", "เด็กหญิง กิตยา ตระกูลพิทักษ์กิจ", 
            "เด็กหญิง ชญานิศ จันต๊ะ", "เด็กหญิง ชนากานต์ อินทิยา", "เด็กหญิง ชนิดาภา จักรแก้ว", 
            "เด็กหญิง ฐิติวรดา เวชภูนนท์", "เด็กหญิง ณัฏฐณิชา นันท์ชัย", "เด็กชาย ธนพล คำเรือง", 
            "เด็กหญิง ธิดาวรรณ ปันคำ", "เด็กหญิง บัณฑิตา ดวงใจ", "เด็กหญิง พรพิมล คำมี", 
            "เด็กหญิง พิชญธิดา แซ่เปี่ยน", "เด็กหญิง มีนารัตน์ พรมโน", "เด็กหญิง ศุกร์ศิริ แซ่ลี", 
            "เด็กหญิง สาธิตา แซ่จ่าว", "เด็กชาย กฤษณกันต์ แซ่จ่าว", "เด็กชาย ชนาธิป อินทิยา", 
            "เด็กชาย ณภรัตน์ แซ่ผ่าน", "เด็กชาย ธนภัทร หาสุข", "เด็กชาย ปฏิพล พรมคำอ้าย", 
            "เด็กชาย ปรัตถ์ รุ่งเรือง", "เด็กชาย ปิยศักดิ์ ศรชัย", "เด็กชาย พชรดนัย ต๊ะวิไชย", 
            "เด็กชาย รัชชานนท์ โยธการี", "เด็กชาย วรวี แซ่เฮ้อ", "เด็กชาย ศักดิ์กริน แสงคำ"
        ] 
    },
    { grade: 'M2', names: ["เด็กหญิง กรชวัล รังษี", "เด็กหญิง กรุณาวดี ไยแหละ", "เด็กชาย ไกรศร แซ่เฮ้อ", "เด็กชาย จักรกฤษณ์ จันทะเหลา"] }, // ครูเติมชื่อเพิ่มได้ที่นี่
    { grade: 'M3', names: ["เด็กหญิง กมลพรรณ ปาละ", "เด็กหญิง กรวีร์ หนองแก้ว", "เด็กชาย กรธนา ควนวิไล"] }, 
    { grade: 'M4', names: ["นางสาว กนกวรรณ ขัดโก", "นางสาว กันยาลักษณ์ คำถ้อย", "นาย ฐานวัฒน์ ปิงเมือง"] },
    {
        grade: 'M5',
        names: [
            "นางสาว ญาณิน ฤทธิ", "นางสาว ณิชกานต์ หนองแก้ว", "นางสาว ตะวัน กองจักร", 
            "นางสาว นรินทร์ทิพย์ ใจแปง", "นางสาว ปริยากร ปาละ", "นางสาว พรพิมล เวียงเงิน", 
            "นางสาว พัชรี แซ่เฮ้อ", "นางสาว ภัทรนันท์ มงคล", "นางสาว วรรณภา มโนธรรม", 
            "นางสาว วิรัลพัชร มโนรส", "นางสาว ศุภธิดา คำเรือง", "นางสาว อรนลิน คำหอม", 
            "นาย ณัฐกิตติ์ คำพงษ์", "นาย ณัฐพล คำจันต๊ะ", "นาย พีรวิชญ์ ยะเรือน", 
            "นาย วรากรณ์ จันตะเหลา", "นาย วิทวัส กันทะเขียว", "นาย วีรภาพ แซ่จ่าว", 
            "นาย ศศิศ ยอดอุดม", "นาย ศราววุฒิ มโนแก้ว", "นาย สิทธิกร สารบุญ", 
            "นาย อุกฤษฎ์ ปันพุฒ"
        ]
    },
    { grade: 'M6', names: ["นาย ปาณชัย แซ่โซ้ง", "นาย วศิลป์ พวงพิกุล", "นางสาว กฤติการณ์ ดวงใจ"] }
];

let curGrade = '';
let tempCheck = {};
let allSt = [];
let fetchedHistory = [];

studentMaster.forEach(g => g.names.forEach((n, i) => allSt.push({ id: `${g.grade}-${i+1}`, no: i+1, name: n, grade: g.grade })));

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    window.scrollTo(0,0);
}

window.handleLogin = () => {
    const pin = document.getElementById('pinInput').value;
    if(pin === '1234') {
        showPage('gradePage');
    } else if(pin === '55140') {
        showPage('adminPage');
        loadAdminData();
    } else {
        document.getElementById('loginError').innerText = 'รหัสผ่านไม่ถูกต้อง';
    }
};

window.handleLogout = () => {
    document.getElementById('pinInput').value = '';
    showPage('loginPage');
};

window.goBack = () => showPage('gradePage');

window.selectGrade = (g) => {
    curGrade = g;
    tempCheck = {};
    const label = document.getElementById('targetGrade');
    if(label) label.innerText = `ชั้นมัธยมศึกษาปีที่ ${g.replace('M','')}`;
    renderList();
    showPage('attendancePage');
};

function renderList() {
    const container = document.getElementById('studentList');
    if(!container) return;
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
    const btn = event.target;
    btn.disabled = true; btn.innerText = 'กำลังบันทึก...';
    const log = { date: new Date().toLocaleDateString('th-TH'), time: new Date().toLocaleTimeString('th-TH'), grade: curGrade, data: tempCheck };
    try {
        await fetch(WEB_APP_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(log) });
        alert('บันทึกเรียบร้อย'); showPage('gradePage');
    } catch (e) { alert('บันทึกผิดพลาด'); }
    finally { btn.disabled = false; btn.innerText = 'บันทึกข้อมูล'; }
};

window.viewAbsenteeReport = async () => {
    showPage('absenteePage');
    const list = document.getElementById('absenteeList');
    list.innerHTML = 'กำลังโหลด...';
    try {
        const res = await fetch(WEB_APP_URL);
        const data = await res.json();
        list.innerHTML = data.length === 0 ? 'ยังไม่มีข้อมูลวันนี้' : '';
        data.reverse().forEach(h => {
            const div = document.createElement('div');
            div.className = 'st-row';
            div.style.fontSize = '0.85rem';
            div.innerHTML = `<strong>ชั้น ${h.grade}</strong> | ${h.time}<br>ขาด: ${h.a || 0} | สาย: ${h.l || 0}`;
            list.appendChild(div);
        });
    } catch (e) { list.innerHTML = 'โหลดล้มเหลว'; }
};

async function loadAdminData() {
    const list = document.getElementById('adminDataList');
    list.innerHTML = 'กำลังโหลดข้อมูลจาก Google Sheets...';
    try {
        const res = await fetch(WEB_APP_URL);
        fetchedHistory = await res.json();
        list.innerHTML = '';
        fetchedHistory.slice(0, 30).forEach(h => {
            const div = document.createElement('div');
            div.style.padding = '8px 0'; div.style.borderBottom = '1px solid #eee';
            div.innerHTML = `<small>${h.date} ${h.time} - ชั้น ${h.grade}</small>`;
            list.appendChild(div);
        });
    } catch (e) { list.innerHTML = 'โหลดล้มเหลว'; }
}

window.downloadExcel = () => {
    if(fetchedHistory.length === 0) return alert('ไม่มีข้อมูล');
    const ws = XLSX.utils.json_to_sheet(fetchedHistory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");
    XLSX.writeFile(wb, `Attendance_Full_Report.xlsx`);
};

setInterval(() => {
    const el = document.getElementById('digitalClock');
    if(el) el.innerText = new Date().toLocaleTimeString('th-TH');
}, 1000);
