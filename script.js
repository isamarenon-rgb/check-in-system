const WEB_APP_URL = `https://script.google.com/macros/s/AKfycbxVxksslCAdSwHIC4opgEVNWBGxzT1D6ZKNbaHeosYCw5h0h34hWjS5cWPexU46XyYqFg/exec`;
const DEFAULT_LOGO = "http://www.sarathum.ac.th/_files/webconfig/55100466_0_20260422-141609.png";
const DEFAULT_BG = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000"; // ใส่ลิงก์สำรองที่ชัวร์ไว้ก่อน

let fetchedData = [];
const studentMaster = [
    { grade: 'M1', names: ["เด็กหญิง กมลรัตน์ คำพงษ์", "เด็กหญิง กัญญาณัฐ คำเฝ้า", "เด็กหญิง กิตยา ตระกูลพิทักษ์กิจ", "เด็กหญิง ชญานิศ จันต๊ะ", "เด็กหญิง ชนากานต์ อินทิยา", "เด็กหญิง ชนิดาภา จักรแก้ว", "เด็กหญิง ฐิติวรดา เวชภูนนท์", "เด็กหญิง ณัฏฐณิชา นันท์ชัย", "เด็กหญิง ธนพล คำเรือง", "เด็กหญิง ธิดาวรรณ ปันคำ", "เด็กหญิง บัณฑิตา ดวงใจ", "เด็กหญิง พรพิมล คำมี", "เด็กหญิง พิชญธิดา แซ่เปี่ยน", "เด็กหญิง มีนารัตน์ พรมโน", "เด็กหญิง ศุกร์ศิริ แซ่ลี", "เด็กหญิง สาธิตา แซ่จ่าว", "เด็กชาย กฤษณกันต์ แซ่จ่าว", "เด็กชาย ชนาธิป อินทิยา", "เด็กชาย ณภรัตน์ แซ่ผ่าน", "เด็กชาย ธนภัทร หาสุข", "เด็กชาย ปฏิพล พรมคำอ้าย", "เด็กชาย ปรัตถ์ รุ่งเรือง", "เด็กชาย ปิยศักดิ์ ศรชัย", "เด็กชาย พชรดนัย ต๊ะวิไชย", "เด็กชาย รัชชานนท์ โยธการี", "เด็กชาย วรวี แซ่เฮ้อ", "เด็กชาย ศักดิ์กริน แสงคำ"] },
    { grade: 'M2', names: ["เด็กหญิง กนกอร ทนที", "เด็กหญิง กรชวัล รังษี", "เด็กหญิง กรุณาวดี ไชยแหละ", "เด็กหญิง กัญญานันท์ ปันจัน", "เด็กหญิง กานต์พิชชา พรมโน", "เด็กหญิง จิดาภา แซ่ลี", "เด็กหญิง ชฎาพร คำลือ", "เด็กหญิง ณภัทร ขัติยะ", "เด็กหญิง นิชนันท์ ชินรัมย์", "เด็กหญิง ปริชญา คำเฝ้า", "เด็กหญิง ปิยะพร ยกบัวแก้ว", "เด็กหญิง พัชราภรณ์ คำหว่าง", "เด็กหญิง พิมพ์นิภา พิบูลสุขเจริญ", "เด็กหญิง ธัญลักษณ์ ธรรมราช", "เด็กหญิง วรกานต์ แซ่ผ่าน", "เด็กหญิง ดาลิ้ง จันทะรัตน์", "เด็กชาย ไกรศร แซ่เฮ้อ", "เด็กชาย จักรกฤษณ์ จันทะเหลา", "เด็กชาย ณัฐพงศ์ คำเรือง", "เด็กชาย ณัฐธีร์ เขื่อนแก้ว", "เด็กชาย ธนวัฒน์ คำแดง", "เด็กชาย เนตรมงคล จูยกปิ่น", "เด็กชาย ยศพัฒน์ ปาละ", "เด็กชาย วัชรพล สุทธาวาส", "เด็กชาย สุริยน กุณะ", "นางสาว เจนจิรา ปรารมภ์", "นางสาว คริสมาตย์ ต๊ะวิไชย", "นาย กฤษณะ ยาปวน", "นาย เจตน์สฤษฎิ์ ชูสกุลพนา", "นาย ถิรวัฒน์ ผาแก้ว", "นาย ธิติโชติ จุติยะ", "นาย พงศ์ภัค แซ่โซ้ง", "นาย สรวิชญ์ พลอยบูรณินทร์", "นาย พงศธร จริงสูงเนิน", "นาย ยศกร แซ่โซ้ง", "นาย ศุภกิตติ์ พีระพงศ์กุล", "นาย อาทิตย์ มูลดี"] },
    { grade: 'M3', names: ["เด็กหญิง กมลพรรณ ปาละ", "เด็กหญิง กรวีร์ หนองแก้ว", "เด็กหญิง กัลยรัตน์ ต๊อดแก้ว", "เด็กหญิง กิจติญา ตามปัญญา", "เด็กหญิง จิรัชญา หนองแก้ว", "เด็กหญิง จิรัชยา คำจิตร", "เด็กหญิง ปิยธิดา พันกาล", "เด็กหญิง ลลิสา เจ๊กบุญ", "เด็กหญิง วิชญาพร คำมี", "เด็กหญิง ศศิณิภา ระลึก", "เด็กหญิง เหมยมั้น แซ่เติ๋น", "เด็กหญิง สุธินันท์ แซ่ลี", "เด็กหญิง รัตนาภรณ์ คำหว่าง", "เด็กชาย กรธนา ควนวิไล", "เด็กชาย ไชยพร อุ่นชื่น", "เด็กชาย ณัฐพงศ์ คำเรือง", "เด็กชาย ธนาณุพนธ์ อนันต์", "เด็กชาย ปรัตถกร คำหว่าง", "เด็กชาย ปัณณทรัพย์ จันทะวงค์", "เด็กชาย ภูริวัฒน์ ไชยชนะ", "เด็กชาย วรัญญู กันนิกา", "เด็กชาย วิทวัส เขื่อนแก้ว", "เด็กชาย สิรวิชญ์ เชื้อหลง", "เด็กชาย อินทัช สมบัติ", "เด็กชาย พงศภัค แซ่จ่าว", "เด็กชาย วรวัฒน์ พรมดวงดี"] },
    { grade: 'M4', names: ["นางสาว กนกวรรณ ขัดโก", "นางสาว กันยาลักษณ์ คำถ้อย", "นางสาว จิตรกัญญา วรศิริสมบัติ", "นางสาว จิรภิญญา แซ่เฮ้อ", "นางสาว ณัฐณิชา แก้วท่าพญา", "นางสาว ธัญชนก แซ่เติ๋น", "นางสาว บงกชกร แซ่จ่าว", "นางสาว เปรมสุดา อุดมเลิศสิริ", "นางสาว พรประวีณ์ เทียนทอง", "นางสาว พรผกา แซ่เฮ้อ", "นางสาว พรพิมล ไชยแหละ", "นางสาว ภคพร ต๊ะวิไชย", "นางสาว ยลรดี เขียวมงคล", "นางสาว วรรณิดา สรรพคุณ", "นางสาว วรัญญา ธัญญะ", "นางสาว สกุลทิพย์ หนองแก้ว", "นางสาว สุดารัตน์ บุราณศรี", "นางสาว อภิษฎา กรรณิกา", "นาย ฐานวัฒน์ ปิงเมือง", "นาย ติณณภพ มิละพงษ์", "นาย ธนกร แซ่เฮ้อ", "นาย ธนโชติ แซ่เล้า", "นาย ธายุกร สุวรรณ์จันทร์", "นาย ปฏิพล ทะอุ่น", "นาย ปฐวี สายทองแท้", "นาย พันธวัช แซ่เจียง", "นาย พีรเทศ ศักมิสิรพันธุ์", "นาย ภาณุวิทย์ จิตรอักษร", "นาย อนุชิต ไทยใหม่"] },
    { grade: 'M5', names: ["นางสาว ญาณิน ฤทธิ", "นางสาว ณิชกานต์ หนองแก้ว", "นางสาว ปริยากร ปาละ", "นางสาว ปุญญากรณ์ แซ่เอี๋ยว", "นางสาว ปุญญารัตน์ แซ่เอี๋ยว", "นางสาว อริส แช่ผ่าน", "นาย ณัฐกิตติ์ คำพงษ์", "นาย ณัฐธีร์ เขื่อนแก้ว", "นาย ธนวัฒน์ คำแดง", "นาย เนตรมงคล จูยกปิ่น", "นาย ยศพัฒน์ ปาละ", "นาย วัชรพล สุทธาวาส", "นาย สุริยน กุณะ", "นางสาว เจนจิรา ปรารมภ์", "นางสาว คริสมาตย์ ต๊ะวิไชย", "นาย กฤษณะ ยาปวน", "นาย เจตน์สฤษฎิ์ ชูสกุลพนา", "นาย ถิรวัฒน์ ผาแก้ว", "นาย ธิติโชติ จุติยะ", "นาย พงศ์ภัค แซ่โซ้ง", "นาย สรวิชญ์ พลอยบูรณินทร์", "นาย พงศธร จริงสูงเนิน", "นาย ยศกร แซ่โซ้ง", "นาย ศุภกิตติ์ พีระพงศ์กุล", "นาย อาทิตย์ มูลดี"] },
    { grade: 'M6', names: ["นาย ปาณชัย แซ่โซ้ง", "นาย วศิลป์ พวงพิกุล", "นางสาว กฤติการณ์ ดวงใจ", "นางสาว จันทิมา จันทร์ยิ้ม", "นางสาว อริณ สมบัติ", "นางสาว บุญตา ณชน", "นางสาว ชุติภัทร อุดเตน", "นาย ยงยศ แซ่โซ้ง", "นาย อัษฎาวุฒิ เเครือติ๊บ"] }
];

let allSt = [];
studentMaster.forEach(g => g.names.forEach((n, i) => allSt.push({ id: `${g.grade}-${i+1}`, no: i+1, name: n, grade: g.grade })));
let tempCheck = {};
let curGrade = '';

setInterval(() => {
    const el = document.getElementById('digitalClock');
    if(el) el.innerText = new Date().toLocaleTimeString('th-TH');
}, 1000);

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

window.handleLogin = () => {
    const pin = document.getElementById('pinInput').value;
    if(pin === '1234') showPage('gradePage');
    else if(pin === '55140') { showPage('adminPage'); renderAdmin(); }
    else document.getElementById('loginError').innerText = 'รหัสผ่านไม่ถูกต้อง';
};

window.handleLogout = () => { document.getElementById('pinInput').value = ''; showPage('loginPage'); };
window.goBack = () => showPage('gradePage');

window.selectGrade = (g) => {
    curGrade = g;
    document.getElementById('targetGrade').innerText = 'ชั้นมัธยมศึกษาปีที่ ' + g.replace('M','');
    tempCheck = {};
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
                <button onclick="st('${s.id}','present')" class="${val==='present'?'active-p':''}">มา</button>
                <button onclick="st('${s.id}','late')" class="${val==='late'?'active-l':''}">สาย</button>
                <button onclick="st('${s.id}','absent')" class="${val==='absent'?'active-a':''}">ขาด</button>
                <button onclick="st('${s.id}','leave')" class="${val==='leave'?'active-v':''}">ลา</button>
            </div>`;
        container.appendChild(row);
    });
}

window.st = (id, s) => { tempCheck[id] = s; renderList(); };

window.confirmSave = async () => {
    const log = { date: new Date().toLocaleDateString('th-TH'), time: new Date().toLocaleTimeString('th-TH'), grade: curGrade, data: tempCheck };
    try {
        await fetch(WEB_APP_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(log) });
        alert('บันทึกข้อมูลเรียบร้อยแล้ว'); showPage('gradePage');
    } catch (e) { alert('เกิดข้อผิดพลาดในการบันทึก'); }
};

window.viewAbsenteeReport = async () => {
    showPage('absenteePage');
    const container = document.getElementById('absenteeList');
    container.innerHTML = `
        <button onclick="goBack()" style="background:#666; color:white; margin-bottom:15px;">⬅️ ย้อนกลับ</button>
        <div id="reportLoadStatus">กำลังโหลดประวัติวันนี้...</div>
    `;
    try {
        const res = await fetch(WEB_APP_URL);
        const data = await res.json();
        const logs = data.slice().reverse();
        const loader = document.getElementById('reportLoadStatus');
        loader.innerHTML = logs.length === 0 ? 'ยังไม่มีการเช็คชื่อในวันนี้' : '';
        logs.forEach(h => {
            const div = document.createElement('div');
            div.className = 'st-row';
            div.innerHTML = `<strong>ชั้น ${h.grade}</strong> (เวลา ${h.time})<br>
                <span style="color:red; font-size:0.85rem;">ขาด: ${h.a || '-'}</span> | 
                <span style="color:orange; font-size:0.85rem;">สาย: ${h.l || '-'}</span>`;
            loader.appendChild(div);
        });
    } catch (e) { document.getElementById('reportLoadStatus').innerText = 'ไม่สามารถดึงข้อมูลได้'; }
};

window.renderAdmin = async () => {
    const container = document.getElementById('masterRecdList');
    container.innerHTML = 'กำลังโหลดคลังสำรอง...';
    try {
        const res = await fetch(WEB_APP_URL + "?action=getArchive");
        const data = await res.json();
        fetchedData = data;
        container.innerHTML = `<button onclick="downloadExcel()" style="background:#2e7d32; color:white; margin-bottom:15px;">💾 ดาวน์โหลด Excel (คลังสำรอง)</button>`;
        if (data.length === 0) { container.innerHTML += '<p>คลังว่างเปล่า</p>'; return; }
        data.slice().reverse().forEach(h => {
            const d = document.createElement('div');
            d.style.cssText = "background:#f9f9f9; padding:10px; border-radius:10px; margin-bottom:5px; font-size:0.85rem; border-left:4px solid #7c4dff;";
            d.innerHTML = `<strong>${h.grade}</strong> | ${h.date} | ขาด: ${h.a || '-'}`;
            container.appendChild(d);
        });
    } catch (e) { container.innerHTML = 'โหลดคลังล้มเหลว'; }
};

window.downloadExcel = () => {
    if(!fetchedData.length) return;
    const ws = XLSX.utils.json_to_sheet(fetchedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Archive");
    XLSX.writeFile(wb, `Report_Archive.xlsx`);
};

window.updateAssets = () => {
    const l = document.getElementById('logoUpload').files[0];
    const b = document.getElementById('bgUpload').files[0];
    if(l) { const r=new FileReader(); r.onload=(e)=>{localStorage.setItem('ob_logo', e.target.result); applyUI();}; r.readAsDataURL(l); }
    if(b) { const r=new FileReader(); r.onload=(e)=>{localStorage.setItem('ob_bg', e.target.result); applyUI();}; r.readAsDataURL(b); }
};

function applyUI() {
    const l = localStorage.getItem('ob_logo') || DEFAULT_LOGO;
    const b = localStorage.getItem('ob_bg') || DEFAULT_BG;
    const logoImg = document.getElementById('appLogo');
    const bgDiv = document.getElementById('bgOverlay');
    if(logoImg) logoImg.src = l;
    if(bgDiv) bgDiv.style.backgroundImage = `url('${b}')`;
}
applyUI();
