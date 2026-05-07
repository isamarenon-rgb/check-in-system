// 1. ตั้งค่าพื้นฐาน (เปลี่ยน URL เป็นของครู)
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxVxksslCAdSwHIC4opgEVNWBGxzT1D6ZKNbaHeosYCw5h0h34hWjS5cWPexU46XyYqFg/exec";
const DEFAULT_LOGO = "http://www.sarathum.ac.th/_files/webconfig/55100466_0_20260422-141609.png";
const DEFAULT_BG = "https://scontent.fbkk22-2.fna.fbcdn.net/v/t39.30808-6/461149451_122204696462373468_3313936640579708918_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=8v7k9Q2_P_YQ7kNvgE6vG5N&_nc_zt=23&_nc_ht=scontent.fbkk22-2.fna&_nc_gid=A_uR_3R5E5u7D_8p3R5_B_D&oh=00_AYC_Q_K_D_D_D&oe=664C_D_D";

// 2. ข้อมูลนักเรียน (ย่อมาให้เหลือเฉพาะส่วนสำคัญเพื่อความลื่นไหล)
const studentMaster = [
    { grade: 'M1', names: ["เด็กหญิง กมลรัตน์ คำพงษ์", "เด็กหญิง กัญญาณัฐ คำเฝ้า", "เด็กหญิง กิตยา ตระกูลพิทักษ์กิจ", "เด็กหญิง ชญานิศ จันต๊ะ", "เด็กหญิง ชนากานต์ อินทิยา", "เด็กหญิง ชนิดาภา จักรแก้ว", "เด็กหญิง ฐิติวรดา เวชภูนนท์", "เด็กหญิง ณัฏฐณิชา นันท์ชัย", "เด็กหญิง ธนพล คำเรือง", "เด็กหญิง ธิดาวรรณ ปันคำ", "เด็กหญิง บัณฑิตา ดวงใจ", "เด็กหญิง พรพิมล คำมี", "เด็กหญิง พิชญธิดา แซ่เปี่ยน", "เด็กหญิง มีนารัตน์ พรมโน", "เด็กหญิง ศุกร์ศิริ แซ่ลี", "เด็กหญิง สาธิตา แซ่จ่าว", "เด็กชาย กฤษณกันต์ แซ่จ่าว", "เด็กชาย ชนาธิป อินทิยา", "เด็กชาย ณภรัตน์ แซ่ผ่าน", "เด็กชาย ธนภัทร หาสุข", "เด็กชาย ปฏิพล พรมคำอ้าย", "เด็กชาย ปรัตถ์ รุ่งเรือง", "เด็กชาย ปิยศักดิ์ ศรชัย", "เด็กชาย พชรดนัย ต๊ะวิไชย", "เด็กชาย รัชชานนท์ โยธการี", "เด็กชาย วรวี แซ่เฮ้อ", "เด็กชาย ศักดิ์กริน แสงคำ"] },
    { grade: 'M2', names: ["เด็กหญิง กนกอร ทนที", "เด็กหญิง กรชวัล รังษี", "เด็กหญิง กรุณาวดี ไยแหละ", "เด็กหญิง กัญญานันท์ ปันจัน", "เด็กหญิง กานต์พิชชา พรมโน", "เด็กชาย ไกรศร แซ่เฮ้อ", "เด็กชาย จักรกฤษณ์ จันทะเหลา"] }, // ใส่ข้อมูล ม.2 เพิ่มเติมได้ที่นี่
    { grade: 'M3', names: ["เด็กหญิง กมลพรรณ ปาละ", "เด็กหญิง กรวีร์ หนองแก้ว", "เด็กชาย กรธนา ควนวิไล"] },
    { grade: 'M4', names: ["นางสาว กนกวรรณ ขัดโก", "นางสาว กันยาลักษณ์ คำถ้อย", "นาย ฐานวัฒน์ ปิงเมือง"] },
    { grade: 'M5', names: ["นางสาว ญาณิน ฤทธิ", "นางสาว ณิชกานต์ หนองแก้ว", "นาย ณัฐกิตติ์ คำพงษ์"] },
    { grade: 'M6', names: ["นาย ปาณชัย แซ่โซ้ง", "นาย วศิลป์ พวงพิกุล", "นางสาว กฤติการณ์ ดวงใจ"] }
];

let curGrade = '';
let tempCheck = {};
let allSt = [];

// แตกข้อมูลรายชื่อนักเรียน
studentMaster.forEach(g => {
    g.names.forEach((n, i) => {
        allSt.push({ id: `${g.grade}-${i+1}`, no: i+1, name: n, grade: g.grade });
    });
});

// 3. ระบบจัดการหน้าจอ (UX)
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(id);
    if(target) target.classList.add('active');
    window.scrollTo(0,0);
}

// 4. ระบบเวลาและ UI ตั้งต้น
function initApp() {
    setInterval(() => {
        const el = document.getElementById('digitalClock');
        if(el) el.innerText = new Date().toLocaleTimeString('th-TH');
    }, 1000);
    applyAssets();
}

function applyAssets() {
    const l = localStorage.getItem('ob_logo') || DEFAULT_LOGO;
    const b = localStorage.getItem('ob_bg') || DEFAULT_BG;
    const logoImg = document.getElementById('appLogo');
    const bgDiv = document.getElementById('bgOverlay');
    if(logoImg) logoImg.src = l;
    if(bgDiv) bgDiv.style.backgroundImage = `url('${b}')`;
}

// 5. ระบบเข้าสู่ระบบ
window.handleLogin = () => {
    const pin = document.getElementById('pinInput').value;
    const error = document.getElementById('loginError');
    if (pin === '1234') {
        showPage('gradePage');
        error.innerText = '';
    } else if (pin === '55140') {
        showPage('adminPage');
        renderAdmin();
        error.innerText = '';
    } else {
        error.innerText = 'รหัสผ่านไม่ถูกต้อง';
    }
};

window.handleLogout = () => {
    document.getElementById('pinInput').value = '';
    showPage('loginPage');
};

// 6. ระบบเลือกชั้นเรียนและเช็คชื่อ
window.selectGrade = (g) => {
    curGrade = g;
    tempCheck = {};
    document.getElementById('targetGrade').innerText = `ชั้นมัธยมศึกษาปีที่ ${g.replace('M','')}`;
    renderStudentList();
    showPage('attendancePage');
};

window.goBack = () => showPage('gradePage');

function renderStudentList() {
    const container = document.getElementById('studentList');
    container.innerHTML = '';
    const filtered = allSt.filter(s => s.grade === curGrade);
    
    filtered.forEach(s => {
        const status = tempCheck[s.id] || 'present';
        const row = document.createElement('div');
        row.className = 'st-row';
        row.innerHTML = `
            <div style="font-weight:600; margin-bottom:10px;">#${s.no} ${s.name}</div>
            <div class="status-btn-group">
                <button onclick="setStatus('${s.id}','present')" class="${status==='present'?'active-p':''}">มา</button>
                <button onclick="setStatus('${s.id}','late')" class="${status==='late'?'active-l':''}">สาย</button>
                <button onclick="setStatus('${s.id}','absent')" class="${status==='absent'?'active-a':''}">ขาด</button>
                <button onclick="setStatus('${s.id}','leave')" class="${status==='leave'?'active-v':''}">ลา</button>
            </div>
        `;
        container.appendChild(row);
    });
}

window.setStatus = (id, s) => {
    tempCheck[id] = s;
    renderStudentList();
};

// 7. ระบบบันทึกข้อมูลไป Google Sheets
window.confirmSave = async () => {
    const btn = event.target;
    btn.disabled = true;
    btn.innerText = 'กำลังบันทึก...';
    
    const log = {
        date: new Date().toLocaleDateString('th-TH'),
        time: new Date().toLocaleTimeString('th-TH'),
        grade: curGrade,
        data: tempCheck
    };

    try {
        await fetch(WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify(log)
        });
        alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
        showPage('gradePage');
    } catch (e) {
        alert('บันทึกไม่สำเร็จ โปรดลองอีกครั้ง');
    } finally {
        btn.disabled = false;
        btn.innerText = 'บันทึกข้อมูล';
    }
};

// 8. ระบบดูประวัติ (Report)
window.viewAbsenteeReport = async () => {
    showPage('absenteePage');
    const container = document.getElementById('absenteeList');
    container.innerHTML = `
        <h3 style="margin-top:0;">ประวัติการเช็คชื่อวันนี้</h3>
        <div id="reportLoader">กำลังโหลด...</div>
        <button onclick="goBack()" class="back-btn" style="width:100%; margin-top:15px;">ย้อนกลับ</button>
    `;
    
    try {
        const res = await fetch(WEB_APP_URL);
        const data = await res.json();
        const loader = document.getElementById('reportLoader');
        loader.innerHTML = data.length === 0 ? 'ยังไม่มีข้อมูลวันนี้' : '';
        
        data.slice().reverse().forEach(h => {
            const div = document.createElement('div');
            div.className = 'st-row';
            div.style.fontSize = '0.9rem';
            div.innerHTML = `
                <strong>ชั้น ${h.grade}</strong> | เวลา ${h.time}<br>
                <span style="color:red;">ขาด: ${h.a || '-'}</span> | <span style="color:orange;">สาย: ${h.l || '-'}</span>
            `;
            loader.appendChild(div);
        });
    } catch (e) {
        document.getElementById('reportLoader').innerText = 'ไม่สามารถดึงข้อมูลได้';
    }
};

// เริ่มต้นแอป
initApp();
