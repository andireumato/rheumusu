import { useState } from "react";
const LOGO_USU = "/logo-usu.jpg";
const LOGO_IRA = "/logo-ira.jpg";


const USERS = {
  supervisor: { id: "sup1", name: "dr. Andi, Sp.PD-KR", role: "supervisor", email: "supervisor@fkusu.ac.id" },
  residents: [
    { id: "res1", name: "dr. Budi Santoso", nim: "2021001", batch: "2021", email: "budi@ppds.fkusu.ac.id" },
    { id: "res2", name: "dr. Citra Dewi", nim: "2022003", batch: "2022", email: "citra@ppds.fkusu.ac.id" },
    { id: "res3", name: "dr. Dian Pratama", nim: "2023005", batch: "2023", email: "dian@ppds.fkusu.ac.id" },
  ]
};

const DIAGNOSES = ["Rheumatoid Arthritis (RA)","Systemic Lupus Erythematosus (SLE)","Gout Arthritis","Osteoarthritis (OA)","Ankylosing Spondylitis (AS)","Psoriatic Arthritis","Sjögren Syndrome","Systemic Sclerosis","Polymyositis / Dermatomyositis","Vasculitis","Fibromyalgia","Mixed Connective Tissue Disease (MCTD)","Antiphospholipid Syndrome (APS)","Reactive Arthritis","Juvenile Idiopathic Arthritis (JIA)","Lainnya"];
const ETHNICITIES = ["Batak Toba","Batak Karo","Batak Mandailing","Batak Simalungun","Batak Pakpak / Dairi","Batak Angkola","Melayu","Jawa","Minangkabau","Aceh","Nias","Tionghoa / Hokkian","India Tamil","Lainnya"];
const EDUCATION_LEVELS = ["Tidak Sekolah","SD / Sederajat","SMP / Sederajat","SMA / Sederajat","Diploma (D1–D3)","Sarjana (S1)","Pascasarjana (S2/S3)"];
const OCCUPATIONS = ["Petani / Nelayan","Buruh / Pekerja Kasar","Wiraswasta / Pedagang","Pegawai Swasta","Pegawai Negeri Sipil (PNS)","TNI / Polri","Tenaga Kesehatan","Guru / Dosen","Ibu Rumah Tangga","Pensiunan","Pelajar / Mahasiswa","Tidak Bekerja","Lainnya"];
const MARITAL_STATUS = ["Belum Menikah","Menikah","Cerai Hidup","Cerai Mati / Janda / Duda"];
const REFERRAL_SOURCES = ["Dokter Umum / Puskesmas","Dokter Spesialis Penyakit Dalam (Sp.PD)","Dokter Spesialis Lain","IGD RSUP Adam Malik","Datang Sendiri (Self-referral)","Rujukan RS Lain","Lainnya"];
const COMORBIDITIES_LIST = ["Hipertensi","Diabetes Mellitus Tipe 2","Penyakit Ginjal Kronik (PGK)","Gagal Jantung","Penyakit Jantung Koroner","Stroke","Dislipidemia","Obesitas","Hiperurisemia","Anemia","Infeksi TB","Hepatitis B/C","Osteoporosis","Depresi / Anxietas","Tidak Ada"];
// ================================================================
// GOOGLE DRIVE INTEGRATION
// Ganti dengan URL dari Google Apps Script deployment Anda
// Panduan: lihat file GoogleAppsScript.js
// ================================================================
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxEM9_Pst7-oYQ2fPAzakap1qc7MquMTJ4lCn593peNJ2M4qAAJHybHqAQX-wkv3SFi0w/exec";

const ACTIVITY_TYPES = [
  { id:"outpatient",label:"Rawat Jalan",icon:"👥",color:"#10b981",target:30 },
  { id:"inpatient",label:"Rawat Inap",icon:"🛏️",color:"#3b82f6",target:10 },
  { id:"cbd",label:"Case Based Discussion",icon:"💬",color:"#8b5cf6",target:1 },
  { id:"journal",label:"Journal Reading",icon:"📖",color:"#f59e0b",target:1 },
  { id:"assignment",label:"Reading Assignment",icon:"📝",color:"#ef4444",target:1 },
  { id:"bst",label:"Bedside Teaching",icon:"🏥",color:"#06b6d4",target:4 },
  { id:"minicex",label:"Mini-CEX",icon:"⚕️",color:"#ec4899",target:4 },
  { id:"dops",label:"DOPS",icon:"🔬",color:"#f97316",target:5 },
];
const RHEUM_MATERIALS = [
  { category:"🔍 Kriteria Diagnosis – Artritis", items:[
    { title:"Kriteria RA (ACR/EULAR 2010)", desc:"Skor ≥6/10 = RA definitif. Berlaku pada pasien ≥1 sendi sinovitis yang tidak ada diagnosis lain.", detail:"DOMAIN & SKOR:\n\nA. Keterlibatan Sendi:\n• 1 sendi besar = 0\n• 2–10 sendi besar = 1\n• 1–3 sendi kecil (±besar) = 2\n• 4–10 sendi kecil (±besar) = 3\n• >10 sendi (≥1 kecil) = 5\n\nB. Serologi (setidaknya 1 tes):\n• RF negatif DAN Anti-CCP negatif = 0\n• RF rendah ATAU Anti-CCP rendah positif = 2\n• RF tinggi ATAU Anti-CCP tinggi positif = 3\n(Rendah: 1–3× ULN; Tinggi: >3× ULN)\n\nC. Reaktan Fase Akut:\n• CRP normal DAN LED normal = 0\n• CRP abnormal ATAU LED abnormal = 1\n\nD. Durasi Gejala:\n• <6 minggu = 0\n• ≥6 minggu = 1\n\nINTERPRETASI:\nSkor ≥6 = RA definitif\nSkor <6 = Perlu follow-up; RA dapat diklasifikasikan jika berkembang\n\nCATATAN: Sendi yang diperiksa = sendi pergelangan, MCP, PIP, MTP (kecuali IP-1 dan sendi karpometakarpal)." },
    { title:"Kriteria Gout (ACR/EULAR 2015)", desc:"Scoring komprehensif berbasis kristal MSU dan klinis.", detail:"STEP 1 – ENTRY CRITERIA:\n≥1 episode bengkak/nyeri/tenderness pada sendi perifer atau bursa\n\nSTEP 2 – SUFFICIENT CRITERIA:\nKristal MSU positif di cairan sendi/tofus = GOUT DEFINITIF (tidak perlu lanjut)\n\nSTEP 3 – SCORING (jika tidak ada bukti kristal):\n\nPOLA KLINIS:\n• Keterlibatan sendi metatarsophalangeal-1 = +2\n• Keterlibatan pergelangan/midfoot = +1\n• Sendi lain = 0\n• Karakteristik episode:\n  - Eritema di atas sendi: +1\n  - Nyeri tidak dapat disentuh/ditekan: +1\n  - Kesulitan berjalan/mobilisasi: +1\n• Perjalanan klinis:\n  - ≥2 episode flare rekuren = +1\n  - 1 episode = 0\n  - Tidak ada flare = -1\n\nBUKTI KLINIS TOFUS:\n• Tofus: +4\n\nLABORATORIUM (asam urat serum diukur di luar flare):\n• <4 mg/dL = -4\n• 4–<6 mg/dL = 0\n• 6–<8 mg/dL = +2\n• 8–<10 mg/dL = +3\n• ≥10 mg/dL = +4\n\nPENCITRAAN:\n• USG: double contour sign = +4\n• DECT: urate deposition = +4\n• Rontgen: erosi tofus = +4\n\nINTERPRETASI:\nSkor ≥8 = Klasifikasi GOUT\nSkor <8 = Bukan gout\n\nRange skor: -4 hingga +23" },
    { title:"Kriteria Psoriatic Arthritis (CASPAR 2006)", desc:"Skor ≥3 = PsA. Sensitifitas 91.4%, spesifisitas 98.7%.", detail:"ENTRY CRITERIA:\nPenyakit inflamasi sendi (sendi, tulang belakang, atau entesis)\n\nSKORING (skor ≥3 = PsA):\n\n1. BUKTI PSORIASIS (salah satu, max 2 poin):\n   a. Psoriasis kulit aktif saat ini = +2\n   b. Riwayat psoriasis (dari pasien/dokter) = +1\n   c. Riwayat keluarga psoriasis (ortu/saudara, jika tidak ada a/b) = +1\n\n2. DISTROFI KUKU PSORIASIS (pitting, onikolisis, hiperkeratosis) = +1\n\n3. RHEUMATOID FACTOR NEGATIF = +1\n\n4. DAKTILITIS:\n   a. Aktif saat ini = +1\n   b. Riwayat daktilitis (dicatat dokter) = +1\n\n5. BUKTI RADIOLOGI:\n   Pembentukan tulang juxta-artikular (periosteal ossification) = +1\n\nINTERPRETASI: Skor ≥3 = Psoriatic Arthritis" },
    { title:"Kriteria Reactive Arthritis", desc:"Triad klasik: artritis, uretritis, konjungtivitis pasca infeksi.", detail:"DEFINISI:\nArtritis steril yang dipicu infeksi genitourinari atau gastrointestinal\n\nAGEN PENCETUS:\n• Genitourinari: Chlamydia trachomatis\n• Gastrointestinal: Salmonella, Shigella, Yersinia, Campylobacter\n\nKRITERIA DIAGNOSIS (ACR):\n1. Artritis perifer: asimetris, terutama ekstremitas bawah\n2. Riwayat infeksi mendahului (1–4 minggu sebelumnya)\n3. Minimal 1 dari:\n   • Uretritis / servisitis\n   • Diare akut\n4. Eksklusi penyebab artritis lain\n\nTRIAD REITER (tidak selalu lengkap):\n• Artritis asimetris\n• Uretritis non-gonokokal\n• Konjungtivitis / uveitis\n\nFITUR TAMBAHAN:\n• Keratoderma blennorrhagica (lesi kulit)\n• Sircinate balanitis\n• Ulkus oral (tidak nyeri)\n• HLA-B27 positif (50–80%)\n• Sakroiliitis unilateral\n\nPEMERIKSAAN: PCR Chlamydia, kultur feses, kultur genitourinari, HLA-B27" },
  ]},
  { category:"🔍 Kriteria Diagnosis – SLE & Penyakit Jaringan Ikat", items:[
    { title:"Kriteria SLE SLICC 2012", desc:"≥4 dari 11 kriteria ATAU biopsi LN + ANA/anti-dsDNA.", detail:"KRITERIA KLINIS (11):\n1. ACLE (ACLE akut/subakut): ruam malar, fotosensitif\n2. Lupus kronik: diskoid, hipertrofik/verrucous\n3. Ulkus oral / nasal\n4. Alopesia non-sikatrisial\n5. Artritis (≥2 sendi synovitis OR nyeri tekan ≥2 sendi + kaku pagi ≥30 menit)\n6. Serositis: pleuritis / perikarditis\n7. Renal: protein urin >500mg/24jam ATAU RBC cast\n8. Neurologi: kejang, psikosis, mononeuritis multiplex, mielitis, neuropati perifer, NPSLE\n9. Anemia hemolitik\n10. Leukopenia <4000/mm³ ATAU limfopenia <1000/mm³\n11. Trombositopenia <100.000/mm³\n\nKRITERIA IMUNOLOGI (6):\n1. ANA di atas nilai normal lab\n2. Anti-dsDNA di atas normal (kecuali ELISA: >2× normal)\n3. Anti-Sm\n4. Antifosfolipid Ab: Lupus antikoagulan, Anti-kardiolipin, Anti-β2GP1\n5. Komplemen rendah: C3 rendah, C4 rendah, atau CH50 rendah\n6. Direct Coombs test positif (tanpa hemolitik anemia)\n\nINTERPRETASI:\n• ≥4 kriteria (≥1 klinis + ≥1 imunologi) = SLE\n• Atau biopsi renal konfirmasi LN + ANA atau anti-dsDNA positif = SLE" },
    { title:"Kriteria SLE ACR/EULAR 2019 ★ BARU", desc:"Sistem skor berbasis domain dengan entry criterion ANA ≥1:80.", detail:"ENTRY CRITERION (WAJIB):\nANA ≥1:80 (HEp-2 cells atau setara) pernah positif\n→ Jika tidak pernah ANA+ = BUKAN SLE (hentikan evaluasi)\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\nSKORING DOMAIN & BOBOT:\n\n🔵 DOMAIN KONSTITUSIONAL:\n• Demam (>38.3°C, tanpa penyebab lain) = +2\n\n🔵 DOMAIN HEMATOLOGI:\n• Leukopenia (<4000/µL) = +3\n• Trombositopenia (<100.000/µL) = +4\n• Anemia hemolitik autoimun = +4\n\n🔵 DOMAIN NEUROPSIKIATRI:\n• Delirium = +2\n• Psikosis = +3\n• Kejang = +5\n\n🔵 DOMAIN MUKOKUTAN:\n• Alopesia non-sikatrisial = +2\n• Ulkus oral = +2\n• Sub-akut kutaneus ATAU lupus diskoid = +4\n• Lupus kutaneus akut (ruam malar, foto-sensitif) = +6\n\n🔵 DOMAIN SEROSA:\n• Efusi pleura atau perikardial = +5\n• Perikarditis akut = +6\n\n🔵 DOMAIN MUSKULOSKELETAL:\n• Artritis: ≥2 sendi synovitis ATAU ≥2 sendi nyeri tekan + kaku pagi ≥30 menit = +6\n\n🔵 DOMAIN RENAL:\n• Protein urin >0.5g/24jam = +4\n• Biopsi renal: LN kelas II atau V = +8\n• Biopsi renal: LN kelas III atau IV = +10\n\n🔴 DOMAIN IMUNOLOGI:\n• Anti-dsDNA ATAU Anti-Sm = +6\n• Antifosfolipid Ab (LA, aCL, aβ2GP1) = +2\n• Komplemen rendah: C3 ATAU C4 rendah = +3\n• Komplemen rendah: C3 DAN C4 rendah = +4\n• Uji Coombs direk positif (tanpa hemolitik) = +1\n\n━━━━━━━━━━━━━━━━━━━━━━━━━\nINTERPRETASI:\nSkor ≥10 = SLE (sensitifitas 96.1%, spesifisitas 93.4%)\nSkor <10 = Tidak memenuhi klasifikasi SLE\n\nATURAN PENTING:\n• Tiap domain, hanya skor TERTINGGI yang dihitung\n• Kriteria tidak dihitung jika lebih baik dijelaskan diagnosis lain\n• Kriteria tidak harus terjadi bersamaan\n• Gunakan kalkulator SLE ACR/EULAR 2019 untuk skor otomatis" },
    { title:"Sjögren Syndrome (ACR/EULAR 2016)", desc:"Skor ≥4 = Sjögren primer.", detail:"ENTRY CRITERIA:\nGejala mata kering DAN/ATAU mulut kering ≥3 bulan\nATAU Kecurigaan klinis kuat dari dokter pemeriksa\n\nEKSKLUSI SEBELUM SCORING:\n• Riwayat radioterapi kepala-leher\n• Hepatitis C aktif (PCR+)\n• AIDS\n• Sarkoidosis\n• Amiloidosis\n• Graft-versus-host disease\n• IgG4-related disease\n\nSKORING:\n\n1. BIOPSI KELENJAR LIUR LABIAL:\n   Focal lymphocytic sialadenitis, focus score ≥1 foci/4mm² = +3\n\n2. ANTI-Ro/SSA POSITIF = +3\n\n3. OCULAR STAINING SCORE ≥5\n   (atau van Bijsterveld ≥4) setidaknya 1 mata = +1\n\n4. SCHIRMER TEST ≤5mm/5 menit setidaknya 1 mata = +1\n\n5. UNSTIMULATED WHOLE SALIVA FLOW RATE ≤0.1mL/menit = +1\n\nINTERPRETASI:\nSkor ≥4 = Sjögren Primer\n\nKLINIS TAMBAHAN:\n• Dry eye: Bengkak kelenjar parotis, artralgia\n• Extraglandular: Fatigue, artritis, neuropati perifer, vaskulitis kulit\n• Risiko limfoma MALT: 5%\n• Pemantauan: Anti-Ro/SSA, Anti-La/SSB, RF, hiperglobulinemia" },
    { title:"Systemic Sclerosis (ACR/EULAR 2013)", desc:"Skor ≥9 = SSc definitif.", detail:"CATATAN: Jika sklerosis kulit jari mencapai sendi MCP = SSc DEFINITIF (tidak perlu lanjut)\n\nSKORING:\n\n1. PENEBALAN KULIT JARI TANGAN (ke arah proksimal dari MCP):\n   • Puffy fingers = +2\n   • Sclerodactyly (distal MCP, proksimal PIP) = +4\n\n2. LESI UJUNG JARI:\n   • Ulkus ujung jari = +2\n   • Pitting scar = +3\n\n3. TELANGIEKTASIA = +2\n\n4. KAPILLAROSKOPI ABNORMAL (SSc pattern) = +2\n\n5. HIPERTENSI PULMONAL DAN/ATAU PENYAKIT PARU INTERSTISIAL = +2\n\n6. FENOMENA RAYNAUD = +3\n\n7. ANTIBODI SPESIFIK SSc (anti-topoisomerase I [Scl-70], anti-sentromere, anti-RNA pol III) = +3\n\nINTERPRETASI:\nSkor ≥9 = SSc definitif\n\nKLASIFIKASI SSc:\n• dcSSc (diffuse): sklerosis proksimal pergelangan\n  - Anti-Scl-70/topoisomerase I\n  - Risiko tinggi ILD, krisis renal\n• lcSSc (limited) = CREST:\n  Calcinosis, Raynaud, Esophageal dysmotility, Sclerodactyly, Telangiectasia\n  - Anti-sentromere\n  - Risiko PAH terlambat" },
    { title:"Antiphospholipid Syndrome (APS)", desc:"Kriteria Sapporo 1999 direvisi 2006.", detail:"KRITERIA KLINIS:\n\n1. TROMBOSIS VASKULAR:\n   ≥1 episode trombosis arteri, vena, atau pembuluh darah kecil pada organ/jaringan apapun, dikonfirmasi pencitraan/Doppler atau histopatologi (tanpa inflamasi bermakna)\n\n2. MORBIDITAS KEHAMILAN:\n   a. ≥1 kematian janin normal (≥10 minggu gestasi)\n   b. ≥1 kelahiran prematur (<34 minggu) karena eklamsia berat/preeklampsia/insufisiensi plasenta\n   c. ≥3 keguguran spontan berturutan (<10 minggu) tanpa kelainan kromosom/hormonal/anatomi\n\nKRITERIA LABORATORIUM (positif ≥2 kali selang 12 minggu):\n1. Lupus Antikoagulan (LA) positif\n2. Anti-kardiolipin IgG/IgM >40 GPL/MPL atau >99 persentil\n3. Anti-β2-glikoprotein I IgG/IgM >99 persentil\n\nINTERPRETASI:\nAPS DEFINITIF = ≥1 klinis + ≥1 laboratorium\n\nKATEGORI RISIKO TROMBOSIS (Triple Positivity = risiko sangat tinggi):\nLow: Satu positif (aCL atau aβ2GP1 titer rendah-sedang)\nModerate: Satu positif (LA atau aCL/aβ2GP1 titer tinggi)\nHigh: LA+ dan aCL+ dan aβ2GP1+ (triple positif)\n\nTERAPI: Antikoagulan warfarin (target INR 2–3 atau 3–4 untuk trombosis rekuren)" },
    { title:"MCTD (Sharp Criteria)", desc:"Mixed Connective Tissue Disease.", detail:"KRITERIA MAYOR:\n1. Edema tangan (sausage fingers)\n2. Synovitis (artritis)\n3. Miositis (konfirmasi EMG/lab/biopsi)\n4. Fenomena Raynaud\n5. Anti-U1 RNP titer tinggi (>1:1600 hemagglutinasi)\n\nKRITERIA MINOR:\n1. Alopesia\n2. Leukopenia (<4000/µL)\n3. Anemia\n4. Pleuritis\n5. Perikarditis\n6. Artralgia\n7. Neuralgia trigeminal\n8. Pipi malar erythema\n9. Trombositopenia\n10. Histologi miositis\n\nINTERPRETASI (Sharp):\nMCTD DEFINITIF = ≥4 kriteria mayor + Anti-U1 RNP tinggi ATAU ≥2 mayor tertentu (Raynaud, edema, artritis/miositis) + Anti-U1 RNP tinggi\n\nFITUR KARAKTERISTIK:\n• Tumpang tindih SLE + SSc + PM\n• Anti-U1-RNP dominan\n• Raynaud hampir universal\n• Prognosis umumnya lebih baik dari SLE/SSc murni" },
  ]},
  { category:"🔍 Kriteria Diagnosis – SpA & Vaskulitis", items:[
    { title:"Kriteria Spondyloartritis (ASAS 2009)", desc:"Untuk nyeri punggung kronik onset <45 tahun.", detail:"ENTRY CRITERIA:\nNyeri punggung ≥3 bulan, onset <45 tahun\n\nA. AXIAL SpA – SACROILIAC IMAGING ARM:\nSakroiliitis pada MRI (inflamasi aktif) ATAU Rontgen (grade 2–4 bilateral / 3–4 unilateral)\n+ ≥1 fitur SpA:\n\nFITUR SpA:\n• IBP (inflammatory back pain)\n• Artritis\n• Entesitis (tumit)\n• Uveitis\n• Daktilitis\n• Psoriasis\n• Penyakit Crohn / kolitis ulseratif\n• Respons baik terhadap NSAID\n• Riwayat keluarga SpA\n• HLA-B27+\n• CRP meningkat\n\nB. AXIAL SpA – CLINICAL ARM:\nHLA-B27 positif\n+ ≥2 fitur SpA dari daftar di atas\n\nINFLAMATORY BACK PAIN (IBP) – Kriteria ASAS:\n≥4 dari 5:\n1. Onset <40 tahun\n2. Onset tersembunyi (insidious)\n3. Membaik dengan latihan\n4. Tidak membaik dengan istirahat\n5. Nyeri malam (membaik saat bangun)\n\nAS DEFINITIF – Modified New York Criteria:\nRadiologi: Sakroiliitis bilateral grade ≥2 ATAU unilateral grade ≥3\n+ ≥1 klinis (IBP, keterbatasan lumbal, keterbatasan ekspansi dada)" },
    { title:"Kriteria Vaskulitis Besar (GCA/PMR/TAK)", desc:"Giant Cell Arteritis, PMR, Takayasu.", detail:"GIANT CELL ARTERITIS (ACR 1990, ≥3 dari 5):\n1. Onset >50 tahun\n2. Nyeri kepala baru/lokalisasi baru\n3. Abnormalitas arteri temporalis (nyeri tekan, pulsasi berkurang)\n4. LED >50mm/jam\n5. Biopsi arteri: nekrosis granulomatosa / giant cells multinuklear\n\nPOLYMYALGIA RHEUMATICA (Bird 1979, ≥3):\n1. Onset >65 tahun\n2. Depresi dan/atau BB turun\n3. Nyeri bahu bilateral\n4. LED >40mm/jam\n5. Kaku pagi >1 jam\n6. Durasi >2 minggu\n7. Nyeri sendi panggul dan/atau paha\n\nTAKAYASU ARTERITIS (ACR 1990, ≥3 dari 6):\n1. Onset <40 tahun\n2. Klaudikasio ekstremitas\n3. Nadi brakialis melemah (≥1 sisi)\n4. Perbedaan TD sistolik >10mmHg antar lengan\n5. Bising arteri subklavia atau aorta\n6. Arteriografi abnormal (penyempitan/oklusi aorta, cabangnya, atau arteri proksimal ekstremitas)\n\nTERAPI VASKULITIS BESAR: Kortikosteroid dosis tinggi (prednison 40–60mg/hari untuk GCA, 15–20mg untuk PMR), taper bertahap" },
    { title:"Vaskulitis ANCA (GPA/MPA/EGPA)", desc:"Granulomatosis dengan Poliangiitis dan terkait.", detail:"GPA (GRANULOMATOSIS DENGAN POLIANGIITIS – Wegener):\nKriteria ACR 2022 (≥5 poin):\n• Inflamasi nasal (pus, krusta, perforasi septum): +3\n• Jaringan kartilago/tulang hidung/telinga/laring terlibat: +2\n• Deformitas saddle-nose: +3\n• Infiltrat paru / nodul / kavitas pada CT: +2\n• Granuloma pada biopsi: +3\n• cANCA/PR3-ANCA positif: +5\n• pANCA/MPO-ANCA positif: -1\nSkor ≥5 = GPA\n\nMPA (MIKROSKOPIK POLIANGIITIS):\nKriteria ACR 2022 (≥5 poin):\n• Penyakit paru interstisial pada CT: +3\n• Fibrin pada biopsi: +1\n• pANCA/MPO-ANCA positif: +6\n• cANCA/PR3-ANCA positif: -1\n• Inflamasi nasal, krusta, ulkus: -3\nSkor ≥5 = MPA\n\nEGPA (EOSINOFILIK GRANULOMATOSIS – Churg-Strauss):\n1. Asma\n2. Eosinofilia >10% leukosit atau eosinofil >1500/µL\n3. Neuropati perifer (mono/multiplex)\n4. Infiltrat paru tidak menetap pada X-Ray/CT\n5. Sinusitis paranasalis\n6. Biopsi: eosinofil ekstravaskuler\n≥4 = EGPA (sensitifitas 85%, spesifisitas 99.7%)" },
  ]},
  { category:"🧮 Kalkulator Klinis – RA", items:[
    { title:"DAS28-CRP", desc:"Disease Activity Score 28 sendi dengan CRP.", isCalculator:"das28" },
    { title:"SDAI", desc:"Simplified Disease Activity Index RA.", isCalculator:"sdai" },
    { title:"CDAI", desc:"Clinical Disease Activity Index (tanpa lab).", isCalculator:"cdai" },
  ]},
  { category:"🧮 Kalkulator Klinis – SLE", items:[
    { title:"SLEDAI-2K (Kalkulator Penuh)", desc:"28-item Systemic Lupus Erythematosus Disease Activity Index.", isCalculator:"sledai2k" },
    { title:"MEX-SLEDAI", desc:"Mexican SLEDAI – versi lebih praktis dari SLEDAI.", isCalculator:"mexsledai" },
    { title:"SLE ACR/EULAR 2019 Score", desc:"Kalkulator kriteria klasifikasi SLE terbaru.", isCalculator:"sle2019" },
  ]},
  { category:"🧮 Kalkulator Klinis – SpA & Lain", items:[
    { title:"BASDAI", desc:"Bath Ankylosing Spondylitis Disease Activity Index.", isCalculator:"basdai" },
    { title:"BASFI", desc:"Bath AS Functional Index.", isCalculator:"basfi" },
    { title:"Schober Test Interpreter", desc:"Interpretasi Schober test dan ekspansi dada.", isCalculator:"schober" },
  ]},
  { category:"💊 Tatalaksana", items:[
    { title:"DMARDs pada RA", desc:"Pilihan csDMARDs, bDMARDs, tsDMARDs.", detail:"csDMARDs (Lini 1):\n• Methotrexate (MTX) 7.5–25mg/minggu (GOLD STANDARD)\n  - Folat 1mg/hari wajib\n  - Monitor: LFT, CBC tiap 3 bulan\n• Hydroxychloroquine (HCQ) 200–400mg/hari (≤5mg/kg)\n  - Skrining mata tiap tahun\n• Sulfasalazine (SSZ) 500mg → titrasi 2–3g/hari\n• Leflunomide (LEF) 20mg/hari (loading 100mg/hari × 3)\n\nbDMARDs (jika gagal 1–2 csDMARDs ± prediktor buruk):\nAnti-TNF:\n• Etanercept 50mg/minggu SC\n• Adalimumab 40mg/2minggu SC\n• Infliximab 3mg/kg IV minggu 0,2,6 → tiap 8 minggu\n• Certolizumab, Golimumab\n\nNon-TNF:\n• Tocilizumab (anti-IL-6) 162mg/minggu SC atau 8mg/kg IV\n• Rituximab (anti-CD20) 1000mg IV × 2 dosis selang 2 minggu\n• Abatacept (CTLA4-Ig) 125mg/minggu SC\n\ntsDMARDs (JAK Inhibitor):\n• Tofacitinib 5mg 2×/hari\n• Baricitinib 4mg/hari (2mg jika GFR 30–60)\n• Upadacitinib 15mg/hari\n\nPRINSIP TREAT-TO-TARGET (T2T):\n• Target: Remisi (DAS28 <2.6) atau Aktivitas Rendah (DAS28 <3.2)\n• Evaluasi tiap 1–3 bulan saat aktif, tiap 3–6 bulan saat stabil\n• Jika tidak mencapai target dalam 3–6 bulan → ganti/tambah obat" },
    { title:"Terapi SLE Komprehensif", desc:"Pendekatan bertingkat sesuai aktivitas dan organ.", detail:"TERAPI DASAR (SEMUA PASIEN SLE):\n• Hydroxychloroquine 5mg/kg BB/hari (WAJIB kecuali KI)\n  - Efek: mencegah flare, menurunkan mortalitas, kardioprotektif\n  - Monitor: Funduskopi tiap tahun (toksisitas retina)\n• Tabir surya SPF ≥50, hindari paparan matahari\n• Suplemen Ca/Vit D (terutama pada steroid kronik)\n• Vaksinasi: influenza tahunan, pneumokok, HPV (sebelum imunosupresi)\n\nSLE RINGAN-SEDANG:\n• NSAID (nyeri/serositis)\n• Prednison 0.5mg/kg/hari → taper\n• Azathioprine (AZA) 1–2.5mg/kg/hari\n• MMF 1–3g/hari\n• Belimumab (anti-BLyS) 10mg/kg IV atau 200mg SC/minggu\n  (indikasi: SLE aktif meski SOC, tidak untuk LN berat/NPSLE)\n\nSLE BERAT / MENGANCAM ORGAN:\n• Pulse methylprednisolone 500–1000mg IV × 3 hari\n• Cyclophosphamide IV:\n  - NIH protocol: 0.5–1g/m² tiap bulan × 6 bulan\n  - Euro-Lupus: 500mg IV tiap 2 minggu × 6 dosis\n• MMF 2–3g/hari (setara efektifitas dengan CYC untuk LN)\n\nLUPUS NEFRITIS (ACR/EULAR 2021):\nInduksi (LN kelas III/IV):\n  • Pulse MP + MMF 2–3g/hari + HCQ ATAU\n  • Pulse MP + Low-dose CYC (Euro-Lupus) + HCQ\n  • Add-on: Belimumab atau Voclosporin (jika tersedia)\nMaintenance:\n  • MMF 1–2g/hari + HCQ (pilihan utama)\n  • AZA 1.5–2.5mg/kg/hari + HCQ (alternatif, atau pada kehamilan)\n\nNEUROPSIKIATRI SLE (NPSLE):\n• Trombosis: antikoagulan\n• Inflamasi/demielinasi: pulse steroid ± CYC\n• Psikosis/kejang: steroid + antipsikotik/antikonvulsan" },
    { title:"Tatalaksana Gout Arthritis", desc:"Manajemen flare akut dan terapi penurun urat jangka panjang.", detail:"A. FLARE AKUT:\nMulai dalam 24 jam onset:\n• Colchicine 1mg → 0.5mg 1 jam kemudian (total 1.5mg)\n  (Dosis lama: 0.5mg 3×/hari – efektif, efek samping lebih)\n• NSAID: Indomethacin 50mg 3×/hari atau Naproxen 500mg 2×/hari\n• Prednison 30–35mg/hari × 3–5 hari (jika NSAID/colchicine KI)\n• Kortikosteroid intra-artikular (untuk sendi tunggal besar)\n\nJANGAN MULAI/HENTIKAN ULT saat flare akut!\n\nB. INDIKASI URATE-LOWERING THERAPY (ULT):\n• ≥2 flare/tahun\n• Gout tofaseus\n• Nefropati urat / batu ginjal\n• Hiperurisemia + kerusakan sendi radiologi\n\nC. URATE-LOWERING THERAPY:\nTarget serum urate:\n• Umum: <6 mg/dL (<357 µmol/L)\n• Tofus/gout berat: <5 mg/dL (<300 µmol/L)\n\nAllopurinol (XO inhibitor – pilihan utama):\n• Mulai 100mg/hari, titrasi tiap 2–5 minggu\n• Target: ≤300mg pada GFR normal (max 900mg)\n• Turunkan dosis pada GFR <30: mulai 50mg/hari\n• HLA-B*58:01 screening sebelum pemberian (Asian)\n• Efek berat: SJS/TEN (terutama HLA-B*58:01+)\n\nFebuxostat (XO inhibitor):\n• 40–80mg/hari\n• HATI-HATI: meningkatkan risiko kejadian kardiovaskular\n• Tidak dianjurkan pada riwayat CVD\n\nD. PROFILAKSIS FLARE (wajib 3–6 bulan pertama ULT):\n• Colchicine 0.5mg/hari (pilihan utama)\n• Naproxen 250mg 2×/hari (alternatif)\n• Prednison ≤10mg/hari (jika keduanya KI)" },
    { title:"Tatalaksana Ankylosing Spondylitis", desc:"Manajemen AS/Axial SpA sesuai panduan ASAS/EULAR.", detail:"PRINSIP MANAJEMEN:\n• Kombinasi farmakologi + non-farmakologi\n• Target: remisi atau aktivitas rendah (BASDAI <4 atau ASDAS <2.1)\n• Monitor tiap 4 minggu (aktif) atau 12 minggu (stabil)\n\nNON-FARMAKOLOGI (WAJIB):\n• Fisioterapi rutin: latihan peregangan tulang belakang, renang\n• Edukasi postur tubuh\n• Berhenti merokok (merokok mempercepat progresi struktural)\n\nFARMAKOLOGI:\n\n1. NSAID (Lini 1):\n• Indomethacin 75–150mg/hari atau Naproxen 1000mg/hari\n• Etoricoxib 60–90mg/hari (lebih ditoleransi)\n• NSAID kontinu lebih efektif dari on-demand (pada aktif)\n• Efek struktural: mungkin memperlambat progresi\n\n2. bDMARDs (jika NSAID gagal, BASDAI ≥4 meski 2×NSAID):\nAnti-TNF (setara efektifitas):\n• Etanercept 50mg/minggu SC\n• Adalimumab 40mg/2minggu SC\n• Infliximab 5mg/kg IV minggu 0,2,6 → tiap 6–8 minggu\n• Certolizumab, Golimumab\n\nAnti-IL-17A:\n• Secukinumab 150mg SC minggu 0,1,2,3,4 → tiap 4 minggu\n  (Pilihan pada komorbid IBD negatif, riwayat gagal Anti-TNF)\n• Ixekizumab 80mg tiap 4 minggu\n\nAnti-IL-23 (nr-AxSpA):\n• Risankizumab, Guselkumab (data berkembang)\n\ntsDMARDs:\n• Tofacitinib 5mg 2×/hari (alternatif jika bDMARDs gagal)\n\nCATATAN: csDMARDs (MTX/SSZ) TIDAK EFEKTIF untuk manifestasi aksial" },
    { title:"Tatalaksana Vaskulitis ANCA", desc:"GPA, MPA, dan EGPA – induksi dan maintenance.", detail:"INDUKSI REMISI:\n\nGPA/MPA:\nOrganic-threatening / life-threatening:\n• Cyclophosphamide (CYC) IV/oral + methylprednisolone pulse\n  CYC IV: 15mg/kg tiap 2 minggu × 3, lalu tiap 3 minggu × 3–6 dosis\n  CYC oral: 2mg/kg/hari × 3–6 bulan\n• Rituximab (RTX) 375mg/m² IV × 4 minggu ATAU 2× 1000mg\n  (Setara CYC; lebih baik untuk relaps, PR3-ANCA+)\n+ Prednison 1mg/kg/hari → taper dalam 4–6 bulan\n\nPlasmaferesis:\n• Kreatinin >500µmol/L, DAH (diffuse alveolar hemorrhage)\n• Pertimbangkan berdasarkan kasus per kasus\n\nEGPA:\n• Kortikosteroid dosis tinggi (prednison 1mg/kg/hari)\n• CYC (jika organ vital terlibat: jantung, GI, renal, CNS)\n• Mepolizumab (anti-IL-5) untuk remisi maintenance EGPA\n\nMAINTENANCE (≥24 bulan):\n• Azathioprine 2mg/kg/hari (pilihan utama)\n• Rituximab 500mg IV tiap 6 bulan (lebih baik pada PR3-ANCA, relaps tinggi)\n• MMF 2–3g/hari (alternatif)\n+ Prednison ≤7.5mg/hari\n\nMONITOR ANCA tiap 3–6 bulan: kenaikan titer PR3-ANCA prediktif relaps" },
    { title:"Osteoartritis – Manajemen", desc:"OA lutut/panggul – rekomendasi OARSI/ACR 2021.", detail:"KONDISI KLINIS OA:\n• OA lutut, panggul, tangan – pendekatannya berbeda\n• Tidak ada terapi disease-modifying yang terbukti (DMOAD)\n\nNON-FARMAKOLOGI (wajib untuk semua):\n• Edukasi pasien: manajemen mandiri\n• Penurunan berat badan (target 10% BB; tiap 1kg BB turun = 4kg beban lutut berkurang)\n• Fisioterapi: quadriceps strengthening, aerobik low-impact\n• Alat bantu: tongkat, knee brace, insole\n• Terapi fisik: TENS, ultrasound (data terbatas)\n\nFARMAKOLOGI – OA LUTUT (diurutkan dari lini 1):\n\n1. Topikal (pilihan utama OA lutut/tangan):\n   • Diklofenak topikal gel 1%/1.5%\n   • Capsaicin topikal\n\n2. Oral:\n   • Paracetamol/Acetaminophen (efek moderat)\n   • NSAID oral: Celecoxib, Naproxen, Ibuprofen (lebih efektif dari paracetamol; perhatikan risiko GI/CV/renal)\n\n3. Intra-artikular:\n   • Kortikosteroid: triamsinolon/metilprednisolon\n     Efektif jangka pendek (2–12 minggu); max 3–4× per tahun\n   • Hyaluronate: data kontroversial, dipertimbangkan individual\n\n4. Opioid lemah (Tramadol) – hanya jika NSAID KI, jangka pendek\n\nTIDAK DIANJURKAN:\n• Glukosamin/kondroitin: tidak terbukti bermakna (EULAR/OARSI)\n• Arthroscopic lavage/debridement: tidak efektif\n\nBEDAH: TKR/THR jika gagal semua konservatif + nyeri bermakna + hendaya fungsional" },
  ]},
  { category:"🧬 Patofisiologi & Imunopatologi", items:[
    { title:"Patogenesis RA", desc:"Peran sitokin, sel T, sel B dalam RA.", detail:"PATOGENESIS RA:\n\n1. INISIASI (lingkungan + genetik):\n• HLA-DRB1 shared epitope (SE) → presentasi sitrullinated peptides ke CD4+ T cells\n• Merokok, periodontitis → protein sitrulinasi (ACPA/anti-CCP terbentuk)\n• Mikrobioma usus berperan dalam disregulasi imun\n\n2. SINOVIITIS:\n• CD4+ T cells → aktivasi makrofag dan fibroblas sinovial (FLS)\n• FLS: hiperproliferasi, invasif (pannus), menghasilkan MMP → erosi tulang-rawan\n• Makrofag: TNF-α, IL-1β, IL-6 (sitokin utama RA)\n\n3. PERAN SITOKIN UTAMA:\n• TNF-α:\n  - Angiogenesis sinovial, aktivasi osteoklas\n  - Target: Anti-TNF (Etanercept, Adalimumab, Infliximab)\n• IL-6:\n  - Anemia kronis, trombositosis reaktif, reaktan fase akut (CRP, fibrinogen)\n  - Target: Tocilizumab (anti-IL-6R)\n• IL-1β: Kartilago degradasi → Anakinra (jarang dipakai)\n• IL-17: Bersama IL-23 → inflamasi entesial, aksial\n\n4. EROSI TULANG:\n• TNF + IL-17 + RANKL → diferensiasi osteoklas → erosi periartikular\n• Osteoprotegerin (OPG) = inhibitor alami RANKL\n\n5. TARGET TERAPI:\n• JAK pathway: JAK1/2/3, TYK2 → JAK inhibitor (Tofacitinib, Baricitinib, Upadacitinib)\n  Blokir multiple sitokin (IL-6, IFN, IL-12/23, IL-2, CSFs)\n• Costimulasi T cell: CD80/86–CD28 → Abatacept\n• Sel B dan ACPA: CD20 → Rituximab" },
    { title:"Patogenesis SLE", desc:"Imunopatologi SLE – defek toleransi, NETosis, komplemen.", detail:"PATOGENESIS SLE (model 3 sinyal):\n\n1. GENETIK & PREDISPOSISI:\n• HLA-DR2, HLA-DR3\n• Defisiensi komplemen awal (C1q, C4A, C2) → gangguan clearance apoptotik\n• Gen IRF5, STAT4, PTPN22, BLK, TNFAIP3\n• Hormonal: estrogen meningkatkan autoreaktivitas B cell\n\n2. SUMBER AUTOANTIGEN – DEFEK CLEARANCE:\n• Sel apoptotik tidak dibersihkan → terekspos chromatin/DNA\n• NETosis (neutrophil extracellular traps):\n  - NET berisi dsDNA, histones, LL-37 → aktivasi plasmacytoid DC\n  - pDC memproduksi IFN-α dalam jumlah besar\n\n3. INTERFERON SIGNATURE (IFN-α):\n• IFN-α: sitokin sentral SLE\n• Aktivasi sel dendritik → presentasi self-antigen\n• Menurunkan toleransi B cell dan T cell perifer\n• Anti-IFN-α: Anifrolumab (disetujui FDA 2021)\n\n4. AUTOANTIBODI SPESIFIK:\n• Anti-dsDNA: marker aktivitas, LN\n• Anti-Sm: spesifik SLE\n• Anti-Ro/SSA: SCLE, lupus neonatal, blok jantung kongenital\n• Anti-La/SSB: dengan anti-Ro\n• Anti-ribosomal P: psikosis lupus\n• Antifosfolipid: trombosis, keguguran (APS)\n\n5. LUPUS NEFRITIS:\n• Kompleks imun (anti-dsDNA + C1q) → deposisi glomerulus\n• Aktivasi komplemen → inflamasi glomerular\n• Kelas ISN/RPS: I–VI (III dan IV paling berat)\n\n6. TERAPI TARGET:\n• Anti-BLyS: Belimumab (B lymphocyte stimulator)\n• Anti-CD20: Rituximab (B cell depletion)\n• Anti-IFN-α receptor: Anifrolumab\n• Calcineurin inhibitor: Tacrolimus, Voclosporin (LN)" },
    { title:"Autoantibodi & Interpretasi", desc:"Panduan interpretasi autoantibodi reumatologi.", detail:"ANA (Antinuclear Antibody):\n• Skrining: titer ≥1:80 bermakna (sensitifitas tinggi, spesifisitas rendah)\n• Pola: Homogen (dsDNA), Speckled (Sm, Ro, La, RNP), Nukleolar (Scl-70), Centromere\n• ANA positif rendah (1:40–1:80): dapat normal pada usia lanjut\n\nANTI-dsDNA:\n• Spesifik SLE (spesifisitas >97%)\n• Korelasi dengan aktivitas penyakit dan LN\n• Titer meningkat = prediksi flare\n\nANTI-Sm:\n• Spesifisitas tinggi SLE (>98%), sensitifitas rendah (25–30%)\n\nANTI-Ro/SSA dan Anti-La/SSB:\n• SLE (subakut kutaneus), Sjögren Primer\n• Anti-Ro: risiko lupus neonatal dan blok jantung kongenital\n• Dapat + pada ANA negatif SLE (ANA-negative lupus)\n\nANTI-U1 RNP:\n• MCTD (titer sangat tinggi)\n• Juga pada SLE, SSc, PM/DM\n\nANTI-Scl-70 (Anti-topoisomerase I):\n• dcSSc (diffuse SSc) → risiko ILD tinggi\n• Spesifisitas >95% untuk SSc\n\nANTI-Centromere (ACA):\n• lcSSc (limited SSc / CREST)\n• Risiko PAH terlambat\n\nANTI-RNA Pol III:\n• dcSSc + risiko krisis renal skleroderma\n\nANTI-CCP/ACPA:\n• Spesifisitas ~98% untuk RA\n• Titer tinggi = prognosis buruk (erosi lebih cepat)\n• Dapat muncul bertahun-tahun sebelum RA klinis\n\nRF (Rheumatoid Factor):\n• Sensitifitas 70–80% untuk RA, spesifisitas rendah\n• Juga pada Sjögren, SLE, HBV/HCV, endokarditis, usia lanjut\n\nANCA:\n• c-ANCA (PR3): GPA (Wegener)\n• p-ANCA (MPO): MPA, EGPA, beberapa GN\n• ANCA negatif tidak menyingkirkan vaskulitis" },
  ]},
  { category:"📋 Panduan Praktis Klinis", items:[
    { title:"Pemeriksaan Fisik Sendi – Panduan", desc:"Teknik pemeriksaan sendi reumatologi bedside.", detail:"PRINSIP DASAR:\n• Look (inspeksi) → Feel (palpasi) → Move (gerakan) → Special Tests\n• Selalu bandingkan sisi kontralateral\n• Dokumentasi: nyeri tekan (+/-), bengkak (+/-), krepitus, ROM (derajat)\n\nSENDI TANGAN & PERGELANGAN:\n• Inspeksi: deformitas (swan neck, boutonniere, ulnar deviation, Z-thumb)\n• Palpasi: nyeri tekan sendi DIP/PIP/MCP/pergelangan\n• Squeeze test (Gaenslen tangan): penekanan melintang MCP → nyeri pada RA\n• Finkelstein test: De Quervain tenosinovitis\n\nLUTUT:\n• Ballottement patella: efusi bermakna\n• Bulge sign (stroke test): efusi minimal\n• McMurray test: meniskus\n• Anterior/Posterior drawer: ligamen krusilat\n• Valgus/varus stress: ligamen kolateral\n\nPUNGGUNG BAWAH / SAKROILIAK:\n• Schober test: <5cm pergerakan (normal ≥5cm dari +5 cm atas dan bawah S1)\n• Modified Schober: L5 hingga 10cm atas dan 5cm bawah\n• FABER (Patrick): fleksi, abduksi, rotasi eksternal → nyeri sakroiliak\n• FADIR: fleksi, adduksi, rotasi internal → patologi panggul\n• Gaenslen test: hiperereksi 1 sisi → provokasi sakroiliak\n• Tragus-to-wall distance: >0cm = keterbatasan servikotorasik (AS)\n• Ekspansi dada: <2.5cm = abnormal\n\nENTESITIS:\n• Titik pemeriksaan: insertio tendo Achilles, fascia plantaris, epikondilus lateral, tuberositas tibia\n• Tekan langsung → VAS nyeri\n• LEI (Leeds Enthesitis Index): 6 titik\n• SPARCC enthesitis index: 16 titik\n\nDOKUMENTASI ARTRITIS:\n• 28-sendi (DAS28): bahu 2, siku 2, pergelangan 2, MCP 10, PIP 10, lutut 2\n• 66/68-sendi: tambah MTF, pergelangan kaki, sendi kaki" },
    { title:"Interpretasi Lab Reumatologi", desc:"Panduan interpretasi pemeriksaan laboratorium.", detail:"REAKTAN FASE AKUT:\n• CRP: meningkat dalam 4–6 jam, t½ = 19 jam, lebih sensitif dari LED\n  Normal: <5 mg/L (hs-CRP: <1 mg/L risiko rendah CVD)\n  RA aktif: 20–200 mg/L; Infeksi bakterial: >100–200 mg/L\n• LED: lebih lambat, dipengaruhi anemia, hiperglobulinemia, usia\n  Normal: pria <(usia/2)mm/jam; wanita <((usia+10)/2)mm/jam\n  Tinggi pada: RA, SLE, vaskulitis, keganasan, infeksi kronik\n\nKOMPLEMEN:\n• C3 normal: 90–180 mg/dL; C4 normal: 16–47 mg/dL\n• Turun pada: SLE aktif (konsumsi), defisiensi herediter\n• Normal/naik: RA aktif, infeksi (reaktan fase akut positif)\n\nURIN (SLE/GN):\n• Protein urin >0.5g/24jam atau rasio protein/kreatinin >0.5 = LN\n• Eritrosit cast / granular cast = GN aktif\n• Leukosituria steril = LN tubulointerstitial\n\nCBS (COMPLETE BLOOD COUNT):\n• Anemia kronis: normositik normokromik, Fe normal/turun, ferritin N/naik\n• Anemia hemolitik: Coombs+, retikulositosis, indirect bilirubin naik\n• Leukopenia <4000: SLE (auto-Ab anti-leukosit), obat (MTX, AZA)\n• Trombositopenia: SLE (anti-platelet), APS, HIT, ITP\n\nASSESSMENT FUNGSI GINJAL:\n• eGFR = CKD-EPI lebih akurat dari MDRD\n• Monitor ketat pada: MTX (toksisitas naik jika GFR<60), NSAIDs, LEF, CYC\n• Kreatinin serum: dipengaruhi massa otot (tidak sensitif awal)\n\nASAM URAT:\n• Hiperurisemia: >6.8 mg/dL (saturasi MSU)\n• Gout aktif: asam urat dapat NORMAL (30% kasus saat flare)\n• Selalu periksa di luar flare akut untuk representasi akurat" },
    { title:"Terapi Kortikosteroid – Dosis & Efek Samping", desc:"Panduan penggunaan kortikosteroid pada penyakit reumatologi.", detail:"KLASIFIKASI DOSIS:\n• Rendah: ≤7.5mg/hari prednisolon-ekuivalen\n• Sedang: >7.5–30mg/hari\n• Tinggi: >30–100mg/hari\n• Pulse: >100mg/hari atau metilprednisolon IV 250–1000mg/hari\n\nEKUIVALENSI DOSIS:\n• Prednison 5mg ≈ Prednisolon 5mg ≈ Metilprednisolon 4mg\n  ≈ Deksametason 0.75mg ≈ Hidrokortison 20mg\n\nINDIKASI STEROID DALAM REUMATOLOGI:\n• RA: dosis bridge saat menunggu DMARDs efektif\n• SLE: moderate-high pada flare organ\n• Vaskulitis: dosis tinggi sebagai backbone terapi\n• PMR: prednison 15–20mg → respons dramatis dalam 2–4 minggu\n• GCA: prednison 40–60mg (cegah kebutaan)\n\nEFEK SAMPING & PENCEGAHAN:\n• Osteoporosis: Ca 1500mg/hari + Vit D 800IU/hari\n  Bisphosphonate jika prednisolon ≥7.5mg/hari >3 bulan\n• Hiperglikemia: monitor GDS, mungkin perlu OAD/insulin\n• Hipertensi: monitor TD, pertimbangkan ACEI/ARB\n• Katarak/glaukoma: pemeriksaan mata rutin\n• Supresi adrenal: taper bertahap (jangan hentikan tiba-tiba)\n  Jika >4 minggu: taper ≤10% per 1–2 minggu, hati-hati di bawah 10mg\n• Infeksi oportunistik: skrining TB sebelum dosis tinggi/biologik\n  Rifampicin profilaksis ATAU Isoniazid 9 bulan jika LTBI\n• Miopati steroid: dosis tinggi jangka panjang → atrofi proksimal" },
  ]}
];

const emptyPatient = {
  mrn:"", initials:"", dob:"", age:"", gender:"P", ethnicity:"", religion:"", marital:"", education:"", occupation:"", address:"", phone:"",
  referralSource:"", referralDate:"", visitDate:"", visitType:"Rawat Jalan (Baru)",
  weight:"", height:"", bmi:"", waist:"", hip:"", whr:"", systolicBp:"", diastolicBp:"", heartRate:"",
  chiefComplaint:"", onsetDate:"", onsetDuration:"", onsetDurationUnit:"bulan", firstDiagnosisDate:"", firstDiagnosisPlace:"", diagnosisDelay:"",
  diagnosis:"", diagnosisSecondary:"", diseaseActivity:"",
  previousTherapy:"", currentTherapy:"", steroidUse:"", nsaidUse:"",
  comorbidities:[], comorbidNotes:"",
  familyHistory:"", familyHistoryDetail:"",
  smoking:"Tidak Pernah", smokingPackYear:"", alcohol:"Tidak", exercise:"", dietNotes:"",
  hb:"", wbc:"", plt:"", esr:"", crp:"", albumin:"", sgot:"", sgpt:"", ureum:"", creatinine:"", gfr:"", urineProtein:"",
  rf:"", antiCcp:"", ana:"", antidsDna:"", antiSm:"", antiphospholipid:"", c3:"", c4:"",
  uricAcid:"", glucose:"", hba1c:"", cholesterol:"", ldl:"", hdl:"", tg:"",
  das28:"", sdai:"", sledai:"", basdai:"", vas:"",
  xray:"", usg:"", mri:"", biopsyResult:"",
  notes:"", inputDate: new Date().toISOString().split("T")[0],
};

// ─ Calculators ─
function DAS28Calc({ onClose }) {
  const [v, setV] = useState({ tj:"", sj:"", crp:"", gh:"" });
  const [res, setRes] = useState(null);
  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"8px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:10 };
  const calc = () => {
    const [tj,sj,crp,gh] = [v.tj,v.sj,v.crp,v.gh].map(parseFloat);
    if ([tj,sj,crp,gh].some(isNaN)) return;
    setRes((0.56*Math.sqrt(tj)+0.28*Math.sqrt(sj)+0.36*Math.log(crp+1)+0.014*gh+0.96).toFixed(2));
  };
  const interp = r => r>=5.1?["Aktivitas Tinggi","#ef4444"]:r>=3.2?["Aktivitas Sedang","#f59e0b"]:r>=2.6?["Aktivitas Rendah","#10b981"]:["Remisi","#06b6d4"];
  return (
    <div style={{ background:"#1e293b", borderRadius:16, padding:24, width:360 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}><h3 style={{ color:"#f1f5f9", margin:0 }}>DAS28-CRP</h3><button onClick={onClose} style={{ background:"none", border:"none", color:"#94a3b8", cursor:"pointer", fontSize:22 }}>×</button></div>
      {[["tj","Tender Joint (0–28)"],["sj","Swollen Joint (0–28)"],["crp","CRP (mg/L)"],["gh","Patient Global (0–100 mm)"]].map(([k,l]) => (
        <div key={k}><label style={{ color:"#94a3b8", fontSize:12, display:"block", marginBottom:4 }}>{l}</label><input type="number" value={v[k]} onChange={e=>setV(p=>({...p,[k]:e.target.value}))} style={IS}/></div>
      ))}
      <button onClick={calc} style={{ width:"100%", background:"linear-gradient(135deg,#3b82f6,#8b5cf6)", border:"none", borderRadius:10, padding:12, color:"white", fontWeight:700, cursor:"pointer", marginBottom:12 }}>Hitung</button>
      {res&&(()=>{const[l,c]=interp(parseFloat(res));return<div style={{background:"#0f172a",borderRadius:10,padding:16,textAlign:"center",border:`2px solid ${c}`}}><div style={{fontSize:38,fontWeight:900,color:c}}>{res}</div><div style={{color:c,fontWeight:700}}>{l}</div><div style={{color:"#64748b",fontSize:11,marginTop:6}}>Remisi&lt;2.6 | Rendah 2.6–3.2 | Sedang 3.2–5.1 | Tinggi≥5.1</div></div>;})()}
    </div>
  );
}

function SDAICalc({ onClose }) {
  const [v, setV] = useState({ tj:"", sj:"", crp:"", pgh:"", egh:"" });
  const [res, setRes] = useState(null);
  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"8px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:10 };
  const calc = () => { const vals=Object.values(v).map(parseFloat); if(vals.some(isNaN))return; setRes(vals.reduce((a,b)=>a+b,0).toFixed(1)); };
  const interp = r => r>26?["Tinggi","#ef4444"]:r>11?["Sedang","#f59e0b"]:r>3.3?["Rendah","#10b981"]:["Remisi","#06b6d4"];
  return (
    <div style={{ background:"#1e293b", borderRadius:16, padding:24, width:360 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}><h3 style={{ color:"#f1f5f9", margin:0 }}>SDAI</h3><button onClick={onClose} style={{ background:"none", border:"none", color:"#94a3b8", cursor:"pointer", fontSize:22 }}>×</button></div>
      {[["tj","Tender Joint (0–28)"],["sj","Swollen Joint (0–28)"],["crp","CRP mg/dL (0–10)"],["pgh","Patient Global (0–10)"],["egh","Evaluator Global (0–10)"]].map(([k,l]) => (
        <div key={k}><label style={{ color:"#94a3b8", fontSize:12, display:"block", marginBottom:4 }}>{l}</label><input type="number" value={v[k]} onChange={e=>setV(p=>({...p,[k]:e.target.value}))} style={IS}/></div>
      ))}
      <button onClick={calc} style={{ width:"100%", background:"linear-gradient(135deg,#10b981,#06b6d4)", border:"none", borderRadius:10, padding:12, color:"white", fontWeight:700, cursor:"pointer", marginBottom:12 }}>Hitung</button>
      {res&&(()=>{const[l,c]=interp(parseFloat(res));return<div style={{background:"#0f172a",borderRadius:10,padding:16,textAlign:"center",border:`2px solid ${c}`}}><div style={{fontSize:38,fontWeight:900,color:c}}>{res}</div><div style={{color:c,fontWeight:700}}>{l}</div><div style={{color:"#64748b",fontSize:11,marginTop:6}}>Remisi≤3.3 | Rendah≤11 | Sedang≤26 | Tinggi&gt;26</div></div>;})()}
    </div>
  );
}

function CDAICalc({ onClose }) {
  const [v, setV] = useState({ tj:"", sj:"", pgh:"", egh:"" });
  const [res, setRes] = useState(null);
  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"8px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:10 };
  const calc = () => { const vals=Object.values(v).map(parseFloat); if(vals.some(isNaN))return; setRes(vals.reduce((a,b)=>a+b,0).toFixed(1)); };
  const interp = r => r>22?["Aktivitas Tinggi","#ef4444"]:r>10?["Aktivitas Sedang","#f59e0b"]:r>2.8?["Aktivitas Rendah","#10b981"]:["Remisi","#06b6d4"];
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:380}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><h3 style={{color:"#f1f5f9",margin:0}}>CDAI</h3><div style={{color:"#64748b",fontSize:11}}>Clinical Disease Activity Index (tanpa lab)</div></div><button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button></div>
      {[["tj","Tender Joint Count (0–28)"],["sj","Swollen Joint Count (0–28)"],["pgh","Patient Global Assessment (0–10)"],["egh","Evaluator/Physician Global (0–10)"]].map(([k,l])=>(
        <div key={k}><label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>{l}</label><input type="number" value={v[k]} onChange={e=>setV(p=>({...p,[k]:e.target.value}))} style={IS}/></div>
      ))}
      <button onClick={calc} style={{width:"100%",background:"linear-gradient(135deg,#ec4899,#8b5cf6)",border:"none",borderRadius:10,padding:12,color:"white",fontWeight:700,cursor:"pointer",marginBottom:12}}>Hitung CDAI</button>
      {res&&(()=>{const[l,c]=interp(parseFloat(res));return<div style={{background:"#0f172a",borderRadius:10,padding:16,textAlign:"center",border:`2px solid ${c}`}}><div style={{fontSize:38,fontWeight:900,color:c}}>{res}</div><div style={{color:c,fontWeight:700,marginBottom:4}}>{l}</div><div style={{color:"#64748b",fontSize:11}}>Remisi≤2.8 | Rendah 2.8–10 | Sedang 10–22 | Tinggi &gt;22</div></div>;})()}
    </div>
  );
}

function SLEDAI2KCalc({ onClose }) {
  const items = [
    { key:"seizure", label:"Kejang (seizure)", desc:"Onset baru; eksklusi metabolik, infeksi, obat", score:8 },
    { key:"psychosis", label:"Psikosis", desc:"Gangguan persepsi realitas (bukan uremia/obat)", score:8 },
    { key:"organicBrain", label:"Organic Brain Syndrome", desc:"Gg kognitif/orientasi/memori/kesadaran", score:8 },
    { key:"visual", label:"Gangguan Visual", desc:"Perubahan retina: badan sitoid, perdarahan, eksudat, papilledema", score:8 },
    { key:"cranialNerve", label:"Gangguan Saraf Kranial", desc:"Neuropati saraf kranial baru", score:8 },
    { key:"lupusHeadache", label:"Lupus Headache", desc:"Nyeri kepala berat persisten, tidak respons analgesik", score:8 },
    { key:"cva", label:"CVA", desc:"Stroke baru (eksklusi arteriosklerosis/hipertensi)", score:8 },
    { key:"vasculitis", label:"Vaskulitis", desc:"Ulserasi, gangren, nodul jari, infark periungual, biopsi+", score:8 },
    { key:"arthritis", label:"Artritis", desc:"≥2 sendi dengan nyeri tekan, bengkak, atau efusi", score:4 },
    { key:"myositis", label:"Miositis", desc:"Nyeri/kelemahan otot proksimal + CPK naik atau EMG/biopsi+", score:4 },
    { key:"urinaryCasts", label:"Silinder Urin", desc:"Silinder granular, eritrosit, hemoglobin, atau campuran", score:4 },
    { key:"hematuria", label:"Hematuria", desc:">5 eritrosit/LPB, eksklusi batu/infeksi", score:4 },
    { key:"proteinuria", label:"Proteinuria", desc:">0.5g/24jam baru atau meningkat", score:4 },
    { key:"pyuria", label:"Pyuria", desc:">5 leukosit/LPB, eksklusi infeksi", score:4 },
    { key:"newRash", label:"Ruam Baru", desc:"Ruam inflamasi baru atau meningkat", score:2 },
    { key:"alopecia", label:"Alopesia Baru", desc:"Kerontokan rambut difus/patch baru/meningkat", score:2 },
    { key:"mucosalUlcers", label:"Ulkus Mukosa Baru", desc:"Ulkus oral/nasal baru", score:2 },
    { key:"pleurisy", label:"Pleuritis", desc:"Nyeri pleuritik/pleural rub/efusi pleura", score:2 },
    { key:"pericarditis", label:"Perikarditis", desc:"Nyeri perikardial/rub/efusi/konfirmasi EKG", score:2 },
    { key:"lowComplement", label:"Komplemen Rendah", desc:"C3/C4/CH50 di bawah nilai normal lab", score:2 },
    { key:"increasedDNA", label:"Anti-dsDNA Meningkat", desc:">25% dari batas normal (Farr) atau di atas normal", score:2 },
    { key:"fever", label:"Demam", desc:">38°C, eksklusi infeksi", score:1 },
    { key:"thrombocytopenia", label:"Trombositopenia", desc:"<100.000 platelet/mm³, eksklusi obat", score:1 },
    { key:"leukopenia", label:"Leukopenia", desc:"<3000 leukosit/mm³, eksklusi obat", score:1 },
  ];
  const [checked, setChecked] = useState({});
  const toggle = k => setChecked(p=>({...p,[k]:!p[k]}));
  const total = items.filter(i=>checked[i.key]).reduce((s,i)=>s+i.score,0);
  const interp = r => r>=20?["Sangat Aktif","#ef4444"]:r>=11?["Aktivitas Tinggi","#f97316"]:r>=6?["Aktivitas Sedang","#f59e0b"]:r>=1?["Aktivitas Ringan","#10b981"]:["Tidak Aktif","#06b6d4"];
  const [l,c] = interp(total);
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:Math.min(560,window.innerWidth-32),maxHeight:"85vh",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h3 style={{color:"#f1f5f9",margin:0}}>SLEDAI-2K</h3><div style={{color:"#64748b",fontSize:11}}>Centang item yang AKTIF dalam 10 hari terakhir</div></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{background:c+"22",border:`2px solid ${c}`,borderRadius:10,padding:"6px 16px",textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:c}}>{total}</div><div style={{color:c,fontSize:11,fontWeight:700}}>{l}</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button>
        </div>
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {items.map(item=>(
          <div key={item.key} onClick={()=>toggle(item.key)} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"8px 10px",borderRadius:10,cursor:"pointer",background:checked[item.key]?"#1e3a5f22":"transparent",border:`1px solid ${checked[item.key]?"#3b82f6":"#334155"}`,marginBottom:6,transition:"all 0.15s"}}>
            <div style={{width:22,height:22,borderRadius:6,border:`2px solid ${checked[item.key]?"#3b82f6":"#475569"}`,background:checked[item.key]?"#3b82f6":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2}}>
              {checked[item.key]&&<span style={{color:"white",fontSize:13,fontWeight:900}}>✓</span>}
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{color:checked[item.key]?"#f1f5f9":"#94a3b8",fontWeight:checked[item.key]?700:400,fontSize:13}}>{item.label}</span>
                <span style={{color:checked[item.key]?"#f59e0b":"#475569",fontWeight:700,fontSize:13,marginLeft:8}}>+{item.score}</span>
              </div>
              <div style={{color:"#64748b",fontSize:11,marginTop:2}}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:12,padding:"10px 14px",background:"#0f172a",borderRadius:10,fontSize:11,color:"#64748b"}}>
        Tidak aktif: 0 | Ringan: 1–5 | Sedang: 6–10 | Tinggi: 11–19 | Sangat aktif: ≥20
      </div>
    </div>
  );
}

function MEXSLEDAICalc({ onClose }) {
  const items = [
    { key:"seizure", label:"Kejang", score:8 },
    { key:"psychosis", label:"Psikosis", score:8 },
    { key:"organicBrain", label:"Organic Brain Syndrome", score:8 },
    { key:"visual", label:"Gangguan Visual", score:8 },
    { key:"cranialNerve", label:"Gangguan Saraf Kranial", score:8 },
    { key:"cva", label:"CVA / Stroke baru", score:8 },
    { key:"vasculitis", label:"Vaskulitis", score:8 },
    { key:"arthritis", label:"Artritis (≥2 sendi)", score:2 },
    { key:"myositis", label:"Miositis", score:4 },
    { key:"urinaryCasts", label:"Silinder Urin", score:4 },
    { key:"hematuria", label:"Hematuria (>5 RBC/LPB)", score:4 },
    { key:"proteinuria", label:"Proteinuria (>0.5g/24jam)", score:4 },
    { key:"rash", label:"Ruam Kulit Baru / Aktif", score:2 },
    { key:"alopecia", label:"Alopesia Aktif", score:2 },
    { key:"mucosalUlcers", label:"Ulkus Mukosa", score:2 },
    { key:"pleuritis", label:"Pleuritis / Perikarditis", score:2 },
    { key:"fever", label:"Demam (>38°C, bukan infeksi)", score:1 },
    { key:"thrombocytopenia", label:"Trombositopenia (<100.000)", score:1 },
    { key:"leukopenia", label:"Leukopenia (<3000)", score:1 },
  ];
  const [checked, setChecked] = useState({});
  const toggle = k => setChecked(p=>({...p,[k]:!p[k]}));
  const total = items.filter(i=>checked[i.key]).reduce((s,i)=>s+i.score,0);
  const interp = r => r>=12?["Aktivitas Tinggi","#ef4444"]:r>=6?["Aktivitas Sedang","#f59e0b"]:r>=1?["Aktivitas Ringan","#10b981"]:["Tidak Aktif","#06b6d4"];
  const [l,c] = interp(total);
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:Math.min(520,window.innerWidth-32),maxHeight:"85vh",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h3 style={{color:"#f1f5f9",margin:0}}>MEX-SLEDAI</h3><div style={{color:"#64748b",fontSize:11}}>Mexican SLEDAI – versi ringkas tanpa lab komplemen & anti-dsDNA</div></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <div style={{background:c+"22",border:`2px solid ${c}`,borderRadius:10,padding:"6px 16px",textAlign:"center"}}><div style={{fontSize:24,fontWeight:900,color:c}}>{total}</div><div style={{color:c,fontSize:11,fontWeight:700}}>{l}</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button>
        </div>
      </div>
      <div style={{overflowY:"auto",flex:1}}>
        {items.map(item=>(
          <div key={item.key} onClick={()=>toggle(item.key)} style={{display:"flex",gap:10,alignItems:"center",padding:"7px 10px",borderRadius:8,cursor:"pointer",background:checked[item.key]?"#1e3a5f22":"transparent",border:`1px solid ${checked[item.key]?"#3b82f6":"#334155"}`,marginBottom:5}}>
            <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${checked[item.key]?"#3b82f6":"#475569"}`,background:checked[item.key]?"#3b82f6":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              {checked[item.key]&&<span style={{color:"white",fontSize:12,fontWeight:900}}>✓</span>}
            </div>
            <div style={{flex:1,color:checked[item.key]?"#f1f5f9":"#94a3b8",fontSize:13}}>{item.label}</div>
            <span style={{color:checked[item.key]?"#f59e0b":"#475569",fontWeight:700,fontSize:13}}>+{item.score}</span>
          </div>
        ))}
      </div>
      <div style={{marginTop:10,padding:"8px 12px",background:"#0f172a",borderRadius:8,fontSize:11,color:"#64748b"}}>
        Tidak aktif: 0 | Ringan: 1–5 | Sedang: 6–11 | Tinggi: ≥12 | Keunggulan: tidak perlu lab komplemen/anti-dsDNA
      </div>
    </div>
  );
}

function SLE2019Calc({ onClose }) {
  const domains = [
    { title:"🔵 Konstitusional", items:[
      { key:"fever", label:"Demam >38.3°C (bukan infeksi)", score:2 },
    ]},
    { title:"🔵 Hematologi", items:[
      { key:"leukopenia", label:"Leukopenia <4000/µL", score:3 },
      { key:"thrombocytopenia", label:"Trombositopenia <100.000/µL", score:4 },
      { key:"autoimmHemolytic", label:"Anemia Hemolitik Autoimun", score:4 },
    ]},
    { title:"🔵 Neuropsikiatri", items:[
      { key:"delirium", label:"Delirium", score:2 },
      { key:"psychosis", label:"Psikosis", score:3 },
      { key:"seizure", label:"Kejang", score:5 },
    ]},
    { title:"🔵 Mukokutan", items:[
      { key:"alopecia", label:"Alopesia Non-Sikatrisial", score:2 },
      { key:"oralUlcers", label:"Ulkus Oral", score:2 },
      { key:"scleDiscoid", label:"SCLE atau Lupus Diskoid", score:4 },
      { key:"acle", label:"Lupus Kutaneus Akut (ruam malar/fotosensiif)", score:6 },
    ]},
    { title:"🔵 Serosa", items:[
      { key:"pleuralPeri", label:"Efusi Pleura atau Perikardial", score:5 },
      { key:"acutePeri", label:"Perikarditis Akut", score:6 },
    ]},
    { title:"🔵 Muskuloskeletal", items:[
      { key:"arthritis", label:"Artritis (≥2 sendi synovitis / nyeri tekan + kaku pagi ≥30 menit)", score:6 },
    ]},
    { title:"🔵 Renal", items:[
      { key:"proteinuria", label:"Protein Urin >0.5g/24jam", score:4 },
      { key:"lnClassII_V", label:"Biopsi Renal: LN kelas II atau V", score:8 },
      { key:"lnClassIII_IV", label:"Biopsi Renal: LN kelas III atau IV", score:10 },
    ]},
    { title:"🔴 Imunologi", items:[
      { key:"antidsDNA_Sm", label:"Anti-dsDNA positif ATAU Anti-Sm positif", score:6 },
      { key:"antiphospholipid", label:"Antifosfolipid Ab positif (LA/aCL/aβ2GP1)", score:2 },
      { key:"c3orC4low", label:"C3 Rendah ATAU C4 Rendah", score:3 },
      { key:"c3andC4low", label:"C3 DAN C4 Rendah", score:4 },
      { key:"coombs", label:"Direct Coombs + (tanpa hemolitik anemia)", score:1 },
    ]},
  ];
  const [checked, setChecked] = useState({});
  const [hasANA, setHasANA] = useState(null);
  const toggle = k => setChecked(p=>({...p,[k]:!p[k]}));
  const total = domains.flatMap(d=>d.items).filter(i=>checked[i.key]).reduce((s,i)=>s+i.score,0);
  const isSLE = hasANA === true && total >= 10;
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:Math.min(580,window.innerWidth-32),maxHeight:"88vh",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><h3 style={{color:"#f1f5f9",margin:0,fontSize:16}}>SLE ACR/EULAR 2019</h3><div style={{color:"#64748b",fontSize:11}}>Kriteria klasifikasi terbaru. Tiap domain: hitung skor TERTINGGI saja.</div></div>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button>
      </div>
      {/* Entry criterion */}
      <div style={{background:"#0f172a",borderRadius:10,padding:12,marginBottom:14,border:`2px solid ${hasANA===true?"#10b981":hasANA===false?"#ef4444":"#334155"}`}}>
        <div style={{color:"#94a3b8",fontSize:12,fontWeight:700,marginBottom:8}}>⚠ ENTRY CRITERION (WAJIB)</div>
        <div style={{color:"#f1f5f9",fontSize:13,marginBottom:8}}>ANA ≥1:80 (HEp-2) pernah positif?</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>setHasANA(true)} style={{flex:1,padding:"8px",borderRadius:8,border:`2px solid ${hasANA===true?"#10b981":"#334155"}`,background:hasANA===true?"#10b98122":"transparent",color:hasANA===true?"#10b981":"#94a3b8",fontWeight:700,cursor:"pointer",fontSize:13}}>✓ Ya, pernah ANA+</button>
          <button onClick={()=>setHasANA(false)} style={{flex:1,padding:"8px",borderRadius:8,border:`2px solid ${hasANA===false?"#ef4444":"#334155"}`,background:hasANA===false?"#ef444422":"transparent",color:hasANA===false?"#ef4444":"#94a3b8",fontWeight:700,cursor:"pointer",fontSize:13}}>✗ Tidak / Tidak diketahui</button>
        </div>
        {hasANA===false&&<div style={{color:"#ef4444",fontSize:12,marginTop:8,fontWeight:600}}>⛔ Tidak memenuhi entry criterion → bukan SLE (hentikan evaluasi)</div>}
      </div>
      {hasANA===true&&(
        <>
          <div style={{overflowY:"auto",flex:1}}>
            {domains.map(domain=>(
              <div key={domain.title} style={{marginBottom:12}}>
                <div style={{color:"#3b82f6",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",marginBottom:6,paddingBottom:4,borderBottom:"1px solid #1e3a5f"}}>{domain.title}</div>
                {domain.items.map(item=>(
                  <div key={item.key} onClick={()=>toggle(item.key)} style={{display:"flex",gap:10,alignItems:"center",padding:"7px 10px",borderRadius:8,cursor:"pointer",background:checked[item.key]?"#1e3a5f33":"transparent",border:`1px solid ${checked[item.key]?"#3b82f6":"#334155"}`,marginBottom:5}}>
                    <div style={{width:20,height:20,borderRadius:5,border:`2px solid ${checked[item.key]?"#3b82f6":"#475569"}`,background:checked[item.key]?"#3b82f6":"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      {checked[item.key]&&<span style={{color:"white",fontSize:12,fontWeight:900}}>✓</span>}
                    </div>
                    <div style={{flex:1,color:checked[item.key]?"#f1f5f9":"#94a3b8",fontSize:13}}>{item.label}</div>
                    <span style={{color:checked[item.key]?"#f59e0b":"#475569",fontWeight:700,fontSize:14}}>+{item.score}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{marginTop:12,padding:"12px 14px",background:"#0f172a",borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{color:"#94a3b8",fontSize:12}}>Total Skor</div>
              <div style={{fontSize:32,fontWeight:900,color:isSLE?"#10b981":total>=6?"#f59e0b":"#64748b"}}>{total}</div>
            </div>
            <div style={{textAlign:"center",padding:"10px 20px",borderRadius:12,border:`2px solid ${isSLE?"#10b981":"#ef4444"}`,background:isSLE?"#10b98122":"#ef444422"}}>
              <div style={{fontSize:22,}}>{isSLE?"✅":"❌"}</div>
              <div style={{color:isSLE?"#10b981":"#ef4444",fontWeight:800,fontSize:13}}>{isSLE?"MEMENUHI KRITERIA SLE":"BELUM MEMENUHI"}</div>
              <div style={{color:"#64748b",fontSize:11}}>Threshold: ≥10 poin</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BASDAICalc({ onClose }) {
  const [v, setV] = useState({ q1:"", q2:"", q3:"", q4:"", q5a:"", q5b:"" });
  const [res, setRes] = useState(null);
  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"8px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:10 };
  const calc = () => {
    const [q1,q2,q3,q4,q5a,q5b] = [v.q1,v.q2,v.q3,v.q4,v.q5a,v.q5b].map(parseFloat);
    if([q1,q2,q3,q4,q5a,q5b].some(isNaN))return;
    const q5avg = (q5a+q5b)/2;
    setRes(((q1+q2+q3+q4+q5avg)/5).toFixed(2));
  };
  const interp = r => r>=4?["Aktivitas Tinggi (Kandidat terapi biologik)","#ef4444"]:r>=2?["Aktivitas Sedang","#f59e0b"]:["Aktivitas Rendah","#10b981"];
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:400}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><h3 style={{color:"#f1f5f9",margin:0}}>BASDAI</h3><div style={{color:"#64748b",fontSize:11}}>Bath AS Disease Activity Index – skala 0–10 tiap pertanyaan</div></div><button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button></div>
      {[["q1","Q1: Kelelahan/fatigue (0–10)"],["q2","Q2: Nyeri punggung/leher/panggul (0–10)"],["q3","Q3: Nyeri/bengkak sendi perifer (0–10)"],["q4","Q4: Nyeri/tidak nyaman saat disentuh (entesitis, 0–10)"],["q5a","Q5a: Intensitas kaku pagi hari (0–10)"],["q5b","Q5b: Durasi kaku pagi ≤2 jam (0–10)"]].map(([k,l])=>(
        <div key={k}><label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>{l}</label><input type="number" min="0" max="10" value={v[k]} onChange={e=>setV(p=>({...p,[k]:e.target.value}))} placeholder="0–10" style={IS}/></div>
      ))}
      <div style={{background:"#0f172a",borderRadius:8,padding:10,marginBottom:12,fontSize:11,color:"#64748b"}}>Formula: (Q1+Q2+Q3+Q4+((Q5a+Q5b)/2))/5</div>
      <button onClick={calc} style={{width:"100%",background:"linear-gradient(135deg,#f59e0b,#ef4444)",border:"none",borderRadius:10,padding:12,color:"white",fontWeight:700,cursor:"pointer",marginBottom:12}}>Hitung BASDAI</button>
      {res&&(()=>{const[l,c]=interp(parseFloat(res));return<div style={{background:"#0f172a",borderRadius:10,padding:16,textAlign:"center",border:`2px solid ${c}`}}><div style={{fontSize:38,fontWeight:900,color:c}}>{res}</div><div style={{color:c,fontWeight:700,fontSize:13}}>{l}</div><div style={{color:"#64748b",fontSize:11,marginTop:6}}>BASDAI ≥4 = indikasi pertimbangan terapi biologik</div></div>;})()}
    </div>
  );
}

function BASFICalc({ onClose }) {
  const questions = [
    "Memakai kaus kaki/stoking tanpa bantuan",
    "Membungkuk mengambil pena dari lantai",
    "Meraih rak tinggi tanpa bantuan",
    "Bangun dari kursi tanpa lengan tanpa bantuan",
    "Bangun dari posisi terlentang di lantai",
    "Berdiri tanpa dukungan selama 10 menit",
    "Naik 12–15 anak tangga tanpa pegangan",
    "Melihat ke belakang tanpa memutar badan",
    "Melakukan aktivitas fisik yang memerlukan tuntutan fisik",
    "Melakukan aktivitas sepanjang hari (di rumah/kerja)",
  ];
  const [vals, setVals] = useState(Array(10).fill(""));
  const [res, setRes] = useState(null);
  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"8px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:8 };
  const calc = () => { const ns=vals.map(parseFloat); if(ns.some(isNaN))return; setRes((ns.reduce((a,b)=>a+b,0)/10).toFixed(2)); };
  const interp = r => r>=6?["Hendaya Berat","#ef4444"]:r>=4?["Hendaya Sedang","#f59e0b"]:r>=2?["Hendaya Ringan","#10b981"]:["Fungsi Normal","#06b6d4"];
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:440,maxHeight:"85vh",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}><div><h3 style={{color:"#f1f5f9",margin:0}}>BASFI</h3><div style={{color:"#64748b",fontSize:11}}>Bath AS Functional Index – Skala 0 (mudah) hingga 10 (tidak bisa)</div></div><button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button></div>
      <div style={{overflowY:"auto",flex:1}}>
        {questions.map((q,i)=>(
          <div key={i} style={{marginBottom:10}}>
            <label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>{i+1}. {q}</label>
            <input type="number" min="0" max="10" value={vals[i]} onChange={e=>{const nv=[...vals];nv[i]=e.target.value;setVals(nv);}} placeholder="0–10" style={IS}/>
          </div>
        ))}
      </div>
      <button onClick={calc} style={{width:"100%",background:"linear-gradient(135deg,#06b6d4,#3b82f6)",border:"none",borderRadius:10,padding:12,color:"white",fontWeight:700,cursor:"pointer",margin:"10px 0 8px"}}>Hitung BASFI</button>
      {res&&(()=>{const[l,c]=interp(parseFloat(res));return<div style={{background:"#0f172a",borderRadius:10,padding:14,textAlign:"center",border:`2px solid ${c}`}}><div style={{fontSize:36,fontWeight:900,color:c}}>{res}</div><div style={{color:c,fontWeight:700}}>{l}</div><div style={{color:"#64748b",fontSize:11,marginTop:4}}>Normal&lt;2 | Ringan 2–4 | Sedang 4–6 | Berat ≥6</div></div>;})()}
    </div>
  );
}

function SchoberCalc({ onClose }) {
  const [vals, setVals] = useState({ mark1:"", mark2:"", chest1:"", chest2:"" });
  const set = (k,v) => setVals(p=>({...p,[k]:v}));
  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"8px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:8 };
  const schober = vals.mark1&&vals.mark2 ? (parseFloat(vals.mark2)-parseFloat(vals.mark1)).toFixed(1) : null;
  const chest = vals.chest1&&vals.chest2 ? (parseFloat(vals.chest2)-parseFloat(vals.chest1)).toFixed(1) : null;
  return (
    <div style={{background:"#1e293b",borderRadius:16,padding:24,width:400}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}><div><h3 style={{color:"#f1f5f9",margin:0}}>Schober & Ekspansi Dada</h3><div style={{color:"#64748b",fontSize:11}}>Pemeriksaan fisik AS/SpA</div></div><button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button></div>
      <div style={{background:"#0f172a",borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:"#64748b",lineHeight:1.7}}>
        <b style={{color:"#94a3b8"}}>Modified Schober Test:</b><br/>
        1. Tandai L5 (5cm bawah) dan 10cm di atas L5<br/>
        2. Pasien membungkuk maksimal ke depan<br/>
        3. Ukur jarak kedua tanda
      </div>
      <label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>Jarak saat berdiri tegak (cm)</label>
      <input type="number" value={vals.mark1} onChange={e=>set("mark1",e.target.value)} placeholder="Biasanya 15 cm" style={IS}/>
      <label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>Jarak saat fleksi maksimal (cm)</label>
      <input type="number" value={vals.mark2} onChange={e=>set("mark2",e.target.value)} placeholder="Normal: ≥20 cm" style={IS}/>
      {schober&&(
        <div style={{background:"#0f172a",borderRadius:10,padding:14,textAlign:"center",border:`2px solid ${parseFloat(schober)>=5?"#10b981":"#ef4444"}`,marginBottom:14}}>
          <div style={{fontSize:28,fontWeight:900,color:parseFloat(schober)>=5?"#10b981":"#ef4444"}}>{schober} cm</div>
          <div style={{color:parseFloat(schober)>=5?"#10b981":"#ef4444",fontWeight:700}}>{parseFloat(schober)>=5?"✓ Normal (≥5cm)":"⚠ Abnormal (<5cm) – keterbatasan fleksi lumbal"}</div>
        </div>
      )}
      <div style={{background:"#0f172a",borderRadius:10,padding:12,marginBottom:14,fontSize:12,color:"#64748b",lineHeight:1.7}}>
        <b style={{color:"#94a3b8"}}>Ekspansi Dada:</b><br/>
        Ukur lingkar dada setinggi ICS4 saat ekspirasi dan inspirasi maksimal
      </div>
      <label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>Lingkar dada saat ekspirasi maksimal (cm)</label>
      <input type="number" value={vals.chest1} onChange={e=>set("chest1",e.target.value)} placeholder="cm" style={IS}/>
      <label style={{color:"#94a3b8",fontSize:12,display:"block",marginBottom:4}}>Lingkar dada saat inspirasi maksimal (cm)</label>
      <input type="number" value={vals.chest2} onChange={e=>set("chest2",e.target.value)} placeholder="Normal: selisih ≥2.5cm" style={IS}/>
      {chest&&(
        <div style={{background:"#0f172a",borderRadius:10,padding:14,textAlign:"center",border:`2px solid ${parseFloat(chest)>=2.5?"#10b981":"#ef4444"}`}}>
          <div style={{fontSize:28,fontWeight:900,color:parseFloat(chest)>=2.5?"#10b981":"#ef4444"}}>{chest} cm</div>
          <div style={{color:parseFloat(chest)>=2.5?"#10b981":"#ef4444",fontWeight:700}}>{parseFloat(chest)>=2.5?"✓ Normal (≥2.5cm)":"⚠ Abnormal (<2.5cm) – keterbatasan ekspansi toraks"}</div>
        </div>
      )}
    </div>
  );
}

// ─ Google Drive Upload ─
async function uploadToGoogleDrive({ residentName, residentNim, activityType, topic, fileName, fileData, fileType, date }) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes("GANTI")) {
    return { success: false, error: "Google Drive belum dikonfigurasi. Hubungi supervisor." };
  }
  try {
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ residentName, residentNim, activityType, topic, fileName, fileData, fileType, date })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: "Gagal terhubung ke Google Drive: " + err.message };
  }
}

// ─ Patient Form ─
const STEPS = ["👤 Identitas","📍 Rujukan","📏 Antropometri","🕐 Riwayat Penyakit","💊 Terapi & Komorbid","🔬 Laboratorium","📊 Skor & Pencitraan","📝 Catatan"];

function PatientForm({ onClose, onSave }) {
  const [step, setStep] = useState(0);
  const [p, setP] = useState({...emptyPatient});
  const set = (k,v) => setP(prev=>({...prev,[k]:v}));
  const toggleComorbid = (v) => setP(prev=>({...prev, comorbidities: prev.comorbidities.includes(v)?prev.comorbidities.filter(x=>x!==v):[...prev.comorbidities,v]}));

  const IS = { width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"9px 12px", color:"#f1f5f9", fontSize:13, boxSizing:"border-box", marginBottom:10 };
  const LB = { color:"#94a3b8", fontSize:11, fontWeight:700, display:"block", marginBottom:3, textTransform:"uppercase", letterSpacing:"0.05em" };
  const G2 = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 };
  const G3 = { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 };
  const SH = { color:"#3b82f6", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", margin:"16px 0 8px", paddingBottom:5, borderBottom:"1px solid #1e3a5f" };
  const Field = ({k,l,type="text",ph=""}) => <div><label style={LB}>{l}</label><input type={type} value={p[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} style={IS}/></div>;
  const Select = ({k,l,opts}) => <div><label style={LB}>{l}</label><select value={p[k]} onChange={e=>set(k,e.target.value)} style={IS}><option value="">Pilih...</option>{opts.map(o=><option key={o}>{o}</option>)}</select></div>;

  const calcBmi = () => {
    const w=parseFloat(p.weight),h=parseFloat(p.height)/100;
    if(w>0&&h>0)set("bmi",(w/(h*h)).toFixed(1));
  };
  const calcWhr = () => {
    const w=parseFloat(p.waist),h=parseFloat(p.hip);
    if(w>0&&h>0)set("whr",(w/h).toFixed(2));
  };
  const calcDelay = (onset,dx) => {
    if(onset&&dx){
      const months=Math.round((new Date(dx)-new Date(onset))/(30.44*24*3600*1000));
      if(months>=0)set("diagnosisDelay",`${months} bulan`);
    }
  };

  const renderStep = () => {
    if(step===0) return (
      <div>
        <div style={SH}>Identitas Pasien</div>
        <div style={G2}><Field k="mrn" l="No. Rekam Medis *" ph="RSH-2024-XXX"/><Field k="initials" l="Inisial Pasien *" ph="Ny. SR / Tn. AB"/></div>
        <div style={G2}>
          <div><label style={LB}>Tanggal Lahir</label><input type="date" value={p.dob} onChange={e=>{set("dob",e.target.value);if(e.target.value){const d=Math.floor((new Date()-new Date(e.target.value))/(365.25*24*3600*1000));set("age",d);}}} style={IS}/></div>
          <Field k="age" l="Usia (tahun) *" type="number" ph="45"/>
        </div>
        <div style={G2}>
          <div><label style={LB}>Jenis Kelamin *</label><select value={p.gender} onChange={e=>set("gender",e.target.value)} style={IS}><option value="P">Perempuan</option><option value="L">Laki-laki</option></select></div>
          <div><label style={LB}>Agama</label><select value={p.religion} onChange={e=>set("religion",e.target.value)} style={IS}><option value="">Pilih...</option>{["Islam","Kristen Protestan","Katolik","Hindu","Buddha","Konghucu"].map(r=><option key={r}>{r}</option>)}</select></div>
        </div>
        <div style={SH}>Data Demografis & Sosial</div>
        <div><label style={LB}>Suku / Etnis *</label><select value={p.ethnicity} onChange={e=>set("ethnicity",e.target.value)} style={IS}><option value="">Pilih suku...</option>{ETHNICITIES.map(e=><option key={e}>{e}</option>)}</select></div>
        <div style={G2}>
          <Select k="marital" l="Status Perkawinan *" opts={MARITAL_STATUS}/>
          <Select k="education" l="Tingkat Pendidikan *" opts={EDUCATION_LEVELS}/>
        </div>
        <Select k="occupation" l="Pekerjaan *" opts={OCCUPATIONS}/>
        <div style={G2}><Field k="address" l="Asal Kabupaten/Kota" ph="Kab. Toba / Kota Medan"/><Field k="phone" l="No. Telepon / WA" ph="08xx"/></div>
      </div>
    );
    if(step===1) return (
      <div>
        <div style={SH}>Sumber Rujukan</div>
        <Select k="referralSource" l="Dirujuk dari *" opts={REFERRAL_SOURCES}/>
        <div style={G2}><div><label style={LB}>Tanggal Rujukan</label><input type="date" value={p.referralDate} onChange={e=>set("referralDate",e.target.value)} style={IS}/></div><div><label style={LB}>Tanggal Kunjungan *</label><input type="date" value={p.visitDate} onChange={e=>set("visitDate",e.target.value)} style={IS}/></div></div>
        <div><label style={LB}>Jenis Kunjungan</label><select value={p.visitType} onChange={e=>set("visitType",e.target.value)} style={IS}>{["Rawat Jalan (Baru)","Rawat Jalan (Kontrol)","Rawat Inap"].map(v=><option key={v}>{v}</option>)}</select></div>
      </div>
    );
    if(step===2) return (
      <div>
        <div style={SH}>Antropometri</div>
        <div style={G2}>
          <div><label style={LB}>Berat Badan (kg)</label><input type="number" value={p.weight} onChange={e=>set("weight",e.target.value)} onBlur={calcBmi} placeholder="70" style={IS}/></div>
          <div><label style={LB}>Tinggi Badan (cm)</label><input type="number" value={p.height} onChange={e=>set("height",e.target.value)} onBlur={calcBmi} placeholder="165" style={IS}/></div>
        </div>
        <div style={G2}>
          <div>
            <label style={LB}>IMT / BMI (kg/m²)</label>
            <div style={{display:"flex",gap:6}}><input type="number" value={p.bmi} onChange={e=>set("bmi",e.target.value)} placeholder="Auto-hitung" style={{...IS,marginBottom:0,flex:1}}/><button onClick={calcBmi} style={{background:"#1e3a5f",border:"1px solid #3b82f6",borderRadius:8,color:"#3b82f6",padding:"0 10px",cursor:"pointer",fontSize:11,marginBottom:10}}>Hitung</button></div>
            {p.bmi&&<div style={{fontSize:11,color:parseFloat(p.bmi)>=27.5?"#ef4444":parseFloat(p.bmi)>=23?"#f59e0b":"#10b981",marginBottom:8}}>{parseFloat(p.bmi)>=27.5?"⚠ Obesitas II (≥27.5)":parseFloat(p.bmi)>=25?"⚠ Obese I (25–27.4)":parseFloat(p.bmi)>=23?"⚠ Overweight (23–24.9)":parseFloat(p.bmi)>=18.5?"✓ Normal":"⚠ Underweight"}</div>}
          </div>
          <div style={{background:"#0f172a",borderRadius:8,padding:"9px 12px",fontSize:11,color:"#64748b",lineHeight:1.7,height:"fit-content"}}>&lt;18.5 Underweight<br/>18.5–22.9 Normal<br/>23–24.9 Overweight<br/>25–27.4 Obese I<br/>≥27.5 Obese II</div>
        </div>
        <div style={G2}>
          <div>
            <label style={LB}>Lingkar Pinggang (cm)</label>
            <input type="number" value={p.waist} onChange={e=>set("waist",e.target.value)} onBlur={calcWhr} placeholder="80" style={IS}/>
            {p.waist&&<div style={{fontSize:11,color:(p.gender==="P"&&parseFloat(p.waist)>=80)||(p.gender==="L"&&parseFloat(p.waist)>=90)?"#ef4444":"#10b981",marginBottom:8}}>{p.gender==="P"?(parseFloat(p.waist)>=80?"⚠ Risiko tinggi (P ≥80cm)":"✓ Normal P"):(parseFloat(p.waist)>=90?"⚠ Risiko tinggi (L ≥90cm)":"✓ Normal L")}</div>}
          </div>
          <div>
            <label style={LB}>Lingkar Panggul (cm)</label>
            <input type="number" value={p.hip} onChange={e=>set("hip",e.target.value)} onBlur={calcWhr} placeholder="95" style={IS}/>
          </div>
        </div>
        <div style={G2}>
          <div><label style={LB}>Rasio Pinggang/Panggul (WHR)</label><div style={{display:"flex",gap:6}}><input type="number" value={p.whr} onChange={e=>set("whr",e.target.value)} placeholder="Auto" style={{...IS,marginBottom:0,flex:1}}/><button onClick={calcWhr} style={{background:"#1e3a5f",border:"1px solid #3b82f6",borderRadius:8,color:"#3b82f6",padding:"0 10px",cursor:"pointer",fontSize:11,marginBottom:10}}>Hitung</button></div></div>
          <div></div>
        </div>
        <div style={SH}>Tanda Vital</div>
        <div style={G3}>
          <Field k="systolicBp" l="TD Sistolik (mmHg)" type="number" ph="120"/>
          <Field k="diastolicBp" l="TD Diastolik (mmHg)" type="number" ph="80"/>
          <Field k="heartRate" l="Nadi (x/menit)" type="number" ph="80"/>
        </div>
      </div>
    );
    if(step===3) return (
      <div>
        <div style={SH}>Keluhan & Onset Gejala</div>
        <div><label style={LB}>Keluhan Utama</label><textarea value={p.chiefComplaint} onChange={e=>set("chiefComplaint",e.target.value)} placeholder="Nyeri sendi, bengkak, kaku pagi hari..." rows={2} style={{...IS,resize:"vertical"}}/></div>
        <div style={G2}>
          <div><label style={LB}>Tanggal / Perkiraan Onset Gejala *</label><input type="date" value={p.onsetDate} onChange={e=>{set("onsetDate",e.target.value);calcDelay(e.target.value,p.firstDiagnosisDate);}} style={IS}/></div>
          <div><label style={LB}>Durasi Sebelum Diagnosis</label><div style={{display:"flex",gap:6}}><input type="number" value={p.onsetDuration} onChange={e=>set("onsetDuration",e.target.value)} placeholder="6" style={{...IS,marginBottom:0,flex:1}}/><select value={p.onsetDurationUnit} onChange={e=>set("onsetDurationUnit",e.target.value)} style={{...IS,marginBottom:0,width:"auto"}}><option>hari</option><option>minggu</option><option>bulan</option><option>tahun</option></select></div></div>
        </div>
        <div style={SH}>Diagnosis</div>
        <div style={G2}>
          <div><label style={LB}>Tanggal Diagnosis Pertama *</label><input type="date" value={p.firstDiagnosisDate} onChange={e=>{set("firstDiagnosisDate",e.target.value);calcDelay(p.onsetDate,e.target.value);}} style={IS}/></div>
          <Field k="firstDiagnosisPlace" l="Tempat Diagnosis Pertama" ph="RS / Klinik"/>
        </div>
        <div><label style={LB}>Diagnostic Delay (otomatis / isi manual)</label><input value={p.diagnosisDelay} onChange={e=>set("diagnosisDelay",e.target.value)} placeholder="Selisih onset – diagnosis pertama" style={IS}/></div>
        <div><label style={LB}>Diagnosis Utama *</label><select value={p.diagnosis} onChange={e=>set("diagnosis",e.target.value)} style={IS}><option value="">Pilih...</option>{DIAGNOSES.map(d=><option key={d}>{d}</option>)}</select></div>
        <Field k="diagnosisSecondary" l="Diagnosis Sekunder / Overlap" ph="Lupus Nefritis, NPSLE..."/>
        <div><label style={LB}>Aktivitas Penyakit (klinis)</label><select value={p.diseaseActivity} onChange={e=>set("diseaseActivity",e.target.value)} style={IS}><option value="">Pilih...</option>{["Remisi","Aktivitas Rendah","Aktivitas Sedang","Aktivitas Tinggi","Flare Akut"].map(d=><option key={d}>{d}</option>)}</select></div>
        <div style={SH}>Riwayat Keluarga</div>
        <div style={G2}>
          <div><label style={LB}>Riwayat Penyakit Serupa dalam Keluarga</label><select value={p.familyHistory} onChange={e=>set("familyHistory",e.target.value)} style={IS}><option value="">-</option><option>Ya</option><option>Tidak</option><option>Tidak Diketahui</option></select></div>
          <Field k="familyHistoryDetail" l="Hubungan Keluarga" ph="Ibu kandung, saudara kandung..."/>
        </div>
      </div>
    );
    if(step===4) return (
      <div>
        <div style={SH}>Riwayat Terapi</div>
        <div><label style={LB}>Terapi Sebelumnya</label><textarea value={p.previousTherapy} onChange={e=>set("previousTherapy",e.target.value)} placeholder="MTX, HCQ, prednison..." rows={2} style={{...IS,resize:"vertical"}}/></div>
        <div><label style={LB}>Terapi Saat Ini *</label><textarea value={p.currentTherapy} onChange={e=>set("currentTherapy",e.target.value)} placeholder="MTX 15mg/minggu + HCQ 400mg/hari" rows={2} style={{...IS,resize:"vertical"}}/></div>
        <div style={G2}>
          <div><label style={LB}>Penggunaan Steroid</label><select value={p.steroidUse} onChange={e=>set("steroidUse",e.target.value)} style={IS}><option value="">-</option><option>Tidak</option><option>Ya – dosis rendah (&lt;7.5mg/hari)</option><option>Ya – dosis sedang (7.5–30mg)</option><option>Ya – dosis tinggi (&gt;30mg)</option><option>Pulse IV</option></select></div>
          <div><label style={LB}>Penggunaan NSAID</label><select value={p.nsaidUse} onChange={e=>set("nsaidUse",e.target.value)} style={IS}><option value="">-</option><option>Tidak</option><option>Sesekali (PRN)</option><option>Reguler</option></select></div>
        </div>
        <div style={SH}>Komorbiditas</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:12}}>
          {COMORBIDITIES_LIST.map(c=><button key={c} onClick={()=>toggleComorbid(c)} style={{padding:"5px 12px",borderRadius:20,border:`1.5px solid ${p.comorbidities.includes(c)?"#3b82f6":"#334155"}`,background:p.comorbidities.includes(c)?"#3b82f622":"transparent",color:p.comorbidities.includes(c)?"#3b82f6":"#94a3b8",fontSize:12,cursor:"pointer",fontWeight:p.comorbidities.includes(c)?700:400}}>{p.comorbidities.includes(c)?"✓ ":""}{c}</button>)}
        </div>
        <Field k="comorbidNotes" l="Catatan Komorbid Tambahan" ph="Detail tambahan..."/>
        <div style={SH}>Gaya Hidup</div>
        <div style={G3}>
          <div><label style={LB}>Merokok</label><select value={p.smoking} onChange={e=>set("smoking",e.target.value)} style={IS}><option>Tidak Pernah</option><option>Mantan Perokok</option><option>Perokok Aktif</option></select></div>
          <Field k="smokingPackYear" l="Pack-Year" type="number" ph="0"/>
          <div><label style={LB}>Alkohol</label><select value={p.alcohol} onChange={e=>set("alcohol",e.target.value)} style={IS}><option>Tidak</option><option>Kadang</option><option>Rutin</option></select></div>
        </div>
        <div style={G2}><Field k="exercise" l="Aktivitas Fisik / Olahraga" ph="Jalan kaki 3x/minggu..."/><Field k="dietNotes" l="Catatan Diet" ph="Diet rendah purin..."/></div>
      </div>
    );
    if(step===5) return (
      <div>
        <div style={SH}>Hematologi & Kimia Darah</div>
        <div style={G3}>{[["hb","Hb (g/dL)"],["wbc","Leukosit (10³/µL)"],["plt","Trombosit (10³/µL)"],["esr","LED / ESR (mm/jam)"],["crp","CRP (mg/L)"],["albumin","Albumin (g/dL)"],["sgot","SGOT (U/L)"],["sgpt","SGPT (U/L)"],["ureum","Ureum (mg/dL)"],["creatinine","Kreatinin (mg/dL)"],["gfr","eGFR (ml/min)"],["urineProtein","Protein Urin"]].map(([k,l])=><div key={k}><label style={LB}>{l}</label><input type={k==="urineProtein"?"text":"number"} value={p[k]} onChange={e=>set(k,e.target.value)} placeholder="-" style={IS}/></div>)}</div>
        <div style={SH}>Serologi Reumatologi</div>
        <div style={G3}>{[["rf","RF"],["antiCcp","Anti-CCP"],["ana","ANA"],["antidsDna","Anti-dsDNA"],["antiSm","Anti-Sm"],["antiphospholipid","Antifosfolipid"],["c3","C3 (mg/dL)"],["c4","C4 (mg/dL)"],["uricAcid","Asam Urat (mg/dL)"]].map(([k,l])=><div key={k}><label style={LB}>{l}</label><input value={p[k]} onChange={e=>set(k,e.target.value)} placeholder="-" style={IS}/></div>)}</div>
        <div style={SH}>Metabolik</div>
        <div style={G3}>{[["glucose","Gula Darah (mg/dL)"],["hba1c","HbA1c (%)"],["cholesterol","Kolesterol Total"],["ldl","LDL (mg/dL)"],["hdl","HDL (mg/dL)"],["tg","Trigliserida (mg/dL)"]].map(([k,l])=><div key={k}><label style={LB}>{l}</label><input type="number" value={p[k]} onChange={e=>set(k,e.target.value)} placeholder="-" style={IS}/></div>)}</div>
      </div>
    );
    if(step===6) return (
      <div>
        <div style={SH}>Skor Aktivitas Penyakit</div>
        <div style={G3}>{[["das28","DAS28"],["sdai","SDAI"],["sledai","SLEDAI-2K"],["basdai","BASDAI"],["vas","VAS Nyeri (0–10)"]].map(([k,l])=><div key={k}><label style={LB}>{l}</label><input type="number" value={p[k]} onChange={e=>set(k,e.target.value)} placeholder="-" style={IS}/></div>)}</div>
        <div style={SH}>Pencitraan & Histopatologi</div>
        <div><label style={LB}>Foto Rontgen</label><textarea value={p.xray} onChange={e=>set("xray",e.target.value)} placeholder="Erosi sendi MCP bilateral..." rows={2} style={{...IS,resize:"vertical"}}/></div>
        <div><label style={LB}>USG Sendi</label><textarea value={p.usg} onChange={e=>set("usg",e.target.value)} placeholder="Double contour sign, tofus..." rows={2} style={{...IS,resize:"vertical"}}/></div>
        <div><label style={LB}>MRI</label><textarea value={p.mri} onChange={e=>set("mri",e.target.value)} placeholder="Sinovitis, bone marrow edema..." rows={2} style={{...IS,resize:"vertical"}}/></div>
        <div><label style={LB}>Biopsi / Histopatologi</label><textarea value={p.biopsyResult} onChange={e=>set("biopsyResult",e.target.value)} placeholder="GN proliferatif difus WHO kelas IV..." rows={2} style={{...IS,resize:"vertical"}}/></div>
      </div>
    );
    if(step===7) return (
      <div>
        <div style={SH}>Catatan & Konfirmasi</div>
        <div><label style={LB}>Catatan Klinis / Penelitian</label><textarea value={p.notes} onChange={e=>set("notes",e.target.value)} placeholder="Catatan tambahan yang relevan..." rows={4} style={{...IS,resize:"vertical"}}/></div>
        <div><label style={LB}>Tanggal Input Data</label><input type="date" value={p.inputDate} onChange={e=>set("inputDate",e.target.value)} style={IS}/></div>
        <div style={{background:"#0f172a",borderRadius:12,padding:16,marginTop:8}}>
          <div style={{color:"#94a3b8",fontWeight:700,fontSize:12,marginBottom:10}}>📋 Ringkasan</div>
          {[[p.mrn,"No. RM"],[`${p.initials||"-"}, ${p.age}th ${p.gender==="P"?"♀":"♂"}`,"Pasien"],[p.ethnicity,"Suku"],[p.education,"Pendidikan"],[p.occupation,"Pekerjaan"],[p.marital,"Status"],[p.referralSource,"Rujukan"],[p.visitDate,"Tgl Kunjungan"],[p.bmi?`${p.bmi} kg/m²`:"","IMT"],[p.waist?`${p.waist}cm`:"","Pinggang"],[p.diagnosis,"Diagnosis"],[p.onsetDate,"Onset"],[p.firstDiagnosisDate,"Tgl Dx Pertama"],[p.diagnosisDelay,"Diagnostic Delay"],[p.diseaseActivity,"Aktivitas"],[p.das28,"DAS28"],[p.sledai,"SLEDAI"],[p.comorbidities.join(", "),"Komorbid"],[p.currentTherapy,"Terapi"]].filter(([v])=>v).map(([v,k])=>(
            <div key={k} style={{display:"flex",gap:8,marginBottom:3}}><span style={{color:"#64748b",fontSize:12,minWidth:120}}>{k}:</span><span style={{color:"#f1f5f9",fontSize:12}}>{v}</span></div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{position:"fixed",inset:0,background:"#000000dd",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
      <div style={{background:"#1e293b",borderRadius:20,width:"100%",maxWidth:640,maxHeight:"92vh",display:"flex",flexDirection:"column",border:"1px solid #334155"}}>
        <div style={{padding:"18px 22px 14px",borderBottom:"1px solid #334155"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <h3 style={{color:"#f1f5f9",margin:0,fontSize:15}}>📋 Form Data Pasien Penelitian</h3>
            <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button>
          </div>
          <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:2}}>
            {STEPS.map((s,i)=><button key={i} onClick={()=>setStep(i)} style={{padding:"4px 9px",borderRadius:7,border:`1.5px solid ${step===i?"#3b82f6":i<step?"#10b981":"#334155"}`,background:step===i?"#3b82f622":i<step?"#10b98122":"transparent",color:step===i?"#3b82f6":i<step?"#10b981":"#64748b",fontSize:10,cursor:"pointer",whiteSpace:"nowrap",fontWeight:step===i?700:400}}>{i<step?"✓ ":""}{s}</button>)}
          </div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"14px 22px"}}>{renderStep()}</div>
        <div style={{padding:"12px 22px",borderTop:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0} style={{padding:"8px 18px",borderRadius:10,border:"1px solid #334155",background:step===0?"transparent":"#334155",color:step===0?"#475569":"#f1f5f9",cursor:step===0?"default":"pointer",fontWeight:600,fontSize:13}}>← Sebelumnya</button>
          <span style={{color:"#64748b",fontSize:12}}>{step+1} / {STEPS.length}</span>
          {step<STEPS.length-1
            ?<button onClick={()=>setStep(s=>s+1)} style={{padding:"8px 18px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",color:"white",cursor:"pointer",fontWeight:700,fontSize:13}}>Lanjut →</button>
            :<button onClick={()=>onSave(p)} style={{padding:"8px 18px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#10b981,#06b6d4)",color:"white",cursor:"pointer",fontWeight:700,fontSize:13}}>💾 Simpan</button>}
        </div>
      </div>
    </div>
  );
}

// ─ Patient Detail ─
function PatientDetail({ patient, onClose }) {
  const res = USERS.residents.find(r=>r.id===patient.residentId);
  const Sec = ({title,children}) => <div style={{marginBottom:16}}><div style={{color:"#3b82f6",fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8,paddingBottom:4,borderBottom:"1px solid #1e3a5f"}}>{title}</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3px 16px"}}>{children}</div></div>;
  const Row = ({l,v}) => v?<div><span style={{color:"#64748b",fontSize:12}}>{l}: </span><span style={{color:"#f1f5f9",fontSize:12,fontWeight:500}}>{v}</span></div>:null;
  return (
    <div style={{position:"fixed",inset:0,background:"#000000dd",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
      <div style={{background:"#1e293b",borderRadius:20,width:"100%",maxWidth:680,maxHeight:"92vh",display:"flex",flexDirection:"column",border:"1px solid #334155"}}>
        <div style={{padding:"18px 22px",borderBottom:"1px solid #334155",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><h3 style={{color:"#f1f5f9",margin:0}}>{patient.initials||patient.mrn}</h3><div style={{color:"#64748b",fontSize:12}}>{patient.diagnosis} · Input: {res?.name}</div></div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>
          <Sec title="Identitas & Demografi">
            <Row l="No. RM" v={patient.mrn}/><Row l="Inisial" v={patient.initials}/>
            <Row l="Usia / JK" v={`${patient.age} tahun / ${patient.gender==="P"?"Perempuan":"Laki-laki"}`}/><Row l="Tanggal Lahir" v={patient.dob}/>
            <Row l="Suku / Etnis" v={patient.ethnicity}/><Row l="Agama" v={patient.religion}/>
            <Row l="Status Perkawinan" v={patient.marital}/><Row l="Pendidikan" v={patient.education}/>
            <Row l="Pekerjaan" v={patient.occupation}/><Row l="Asal Daerah" v={patient.address}/>
          </Sec>
          <Sec title="Rujukan & Kunjungan">
            <Row l="Dirujuk dari" v={patient.referralSource}/><Row l="Tgl Rujukan" v={patient.referralDate}/>
            <Row l="Tgl Kunjungan" v={patient.visitDate}/><Row l="Jenis Kunjungan" v={patient.visitType}/>
          </Sec>
          <Sec title="Antropometri & Tanda Vital">
            <Row l="BB / TB" v={patient.weight&&patient.height?`${patient.weight} kg / ${patient.height} cm`:null}/>
            <Row l="IMT" v={patient.bmi?`${patient.bmi} kg/m²`:null}/>
            <Row l="Lingkar Pinggang" v={patient.waist?`${patient.waist} cm`:null}/>
            <Row l="Rasio Pinggang/Panggul" v={patient.whr}/>
            <Row l="Tekanan Darah" v={patient.systolicBp?`${patient.systolicBp}/${patient.diastolicBp} mmHg`:null}/>
            <Row l="Nadi" v={patient.heartRate?`${patient.heartRate} x/menit`:null}/>
          </Sec>
          <Sec title="Riwayat Penyakit">
            <Row l="Keluhan Utama" v={patient.chiefComplaint}/>
            <Row l="Onset Gejala" v={patient.onsetDate}/>
            <Row l="Durasi Pra-Diagnosis" v={patient.onsetDuration?`${patient.onsetDuration} ${patient.onsetDurationUnit}`:null}/>
            <Row l="Tgl Diagnosis Pertama" v={patient.firstDiagnosisDate}/>
            <Row l="Tempat Diagnosis" v={patient.firstDiagnosisPlace}/>
            <Row l="Diagnostic Delay" v={patient.diagnosisDelay}/>
            <Row l="Diagnosis Utama" v={patient.diagnosis}/>
            <Row l="Diagnosis Sekunder" v={patient.diagnosisSecondary}/>
            <Row l="Aktivitas Penyakit" v={patient.diseaseActivity}/>
            <Row l="Riwayat Keluarga" v={patient.familyHistory}/>
          </Sec>
          <Sec title="Terapi & Komorbid">
            <Row l="Terapi Saat Ini" v={patient.currentTherapy}/>
            <Row l="Terapi Sebelumnya" v={patient.previousTherapy}/>
            <Row l="Steroid" v={patient.steroidUse}/><Row l="NSAID" v={patient.nsaidUse}/>
            <Row l="Komorbiditas" v={patient.comorbidities?.join(", ")}/>
            <Row l="Merokok" v={patient.smoking}/><Row l="Alkohol" v={patient.alcohol}/>
          </Sec>
          <Sec title="Laboratorium & Serologi">
            <Row l="Hb" v={patient.hb}/><Row l="Leukosit" v={patient.wbc}/>
            <Row l="Trombosit" v={patient.plt}/><Row l="LED/ESR" v={patient.esr}/>
            <Row l="CRP" v={patient.crp}/><Row l="Albumin" v={patient.albumin}/>
            <Row l="Kreatinin" v={patient.creatinine}/><Row l="eGFR" v={patient.gfr}/>
            <Row l="Protein Urin" v={patient.urineProtein}/><Row l="Asam Urat" v={patient.uricAcid}/>
            <Row l="RF" v={patient.rf}/><Row l="Anti-CCP" v={patient.antiCcp}/>
            <Row l="ANA" v={patient.ana}/><Row l="Anti-dsDNA" v={patient.antidsDna}/>
            <Row l="C3 / C4" v={patient.c3?`${patient.c3} / ${patient.c4}`:null}/>
            <Row l="LDL / HDL" v={patient.ldl?`${patient.ldl} / ${patient.hdl}`:null}/>
          </Sec>
          <Sec title="Skor Aktivitas & Pencitraan">
            <Row l="DAS28" v={patient.das28}/><Row l="SDAI" v={patient.sdai}/>
            <Row l="SLEDAI-2K" v={patient.sledai}/><Row l="BASDAI" v={patient.basdai}/>
            <Row l="VAS Nyeri" v={patient.vas}/>
            <Row l="Rontgen" v={patient.xray}/><Row l="USG Sendi" v={patient.usg}/>
            <Row l="Biopsi/PA" v={patient.biopsyResult}/>
          </Sec>
          {patient.notes&&<div style={{background:"#0f172a",borderRadius:10,padding:12}}><div style={{color:"#64748b",fontSize:10,marginBottom:4}}>CATATAN</div><div style={{color:"#94a3b8",fontSize:13}}>{patient.notes}</div></div>}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function RheumUSU() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email:"", password:"", role:"resident" });
  const [showRegister, setShowRegister] = useState(false);
  const [regForm, setRegForm] = useState({ fullName:"", nim:"", phone:"", email:"", password:"", confirmPassword:"" });
  const [regStatus, setRegStatus] = useState(null);
  const [regError, setRegError] = useState("");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [logbookEntries, setLogbookEntries] = useState([
    { id:1,residentId:"res1",date:"2024-03-01",type:"outpatient",patientName:"Pasien A",diagnosis:"Rheumatoid Arthritis (RA)",notes:"Kontrol rutin",status:"approved" },
    { id:2,residentId:"res1",date:"2024-03-03",type:"cbd",topic:"NPSLE Management",notes:"Diskusi NPSLE",status:"pending" },
    { id:3,residentId:"res2",date:"2024-03-05",type:"journal",topic:"Treat-to-Target in RA",notes:"NEJM 2024",status:"approved" },
    { id:4,residentId:"res1",date:"2024-03-08",type:"inpatient",patientName:"Pasien B",diagnosis:"SLE dengan Lupus Nefritis",notes:"Pulse methylprednisolone",status:"pending" },
  ]);
  const [patients, setPatients] = useState([
    { id:1,residentId:"res1",mrn:"RSH-2024-001",initials:"Ny. SR",dob:"1979-04-15",age:45,gender:"P",ethnicity:"Batak Toba",religion:"Kristen Protestan",marital:"Menikah",education:"SMA / Sederajat",occupation:"Ibu Rumah Tangga",address:"Kab. Toba",referralSource:"Dokter Spesialis Penyakit Dalam (Sp.PD)",visitDate:"2024-03-01",visitType:"Rawat Jalan (Kontrol)",weight:"62",height:"155",bmi:"25.8",waist:"82",hip:"96",whr:"0.85",systolicBp:"130",diastolicBp:"85",heartRate:"80",chiefComplaint:"Nyeri dan kaku sendi jari tangan bilateral, kaku pagi >1 jam",onsetDate:"2021-01-10",onsetDuration:"8",onsetDurationUnit:"bulan",firstDiagnosisDate:"2021-09-01",firstDiagnosisPlace:"RSUP Adam Malik Medan",diagnosisDelay:"8 bulan",diagnosis:"Rheumatoid Arthritis (RA)",diseaseActivity:"Aktivitas Sedang",currentTherapy:"MTX 15mg/minggu + HCQ 400mg/hari + Asam folat 1mg/hari",previousTherapy:"MTX 7.5mg + prednison",steroidUse:"Ya – dosis rendah (<7.5mg/hari)",nsaidUse:"Sesekali (PRN)",comorbidities:["Hipertensi","Dislipidemia"],familyHistory:"Ya",familyHistoryDetail:"Ibu kandung",smoking:"Tidak Pernah",alcohol:"Tidak",hb:"10.8",wbc:"9.2",plt:"320",esr:"68",crp:"24",albumin:"3.8",creatinine:"0.8",rf:"Positif (256 IU/mL)",antiCcp:"Positif (>200 U/mL)",das28:"4.8",vas:"6",inputDate:"2024-03-01" },
    { id:2,residentId:"res2",mrn:"RSH-2024-002",initials:"Ny. DL",dob:"1996-07-22",age:27,gender:"P",ethnicity:"Melayu",religion:"Islam",marital:"Menikah",education:"Sarjana (S1)",occupation:"Guru / Dosen",address:"Kota Medan",referralSource:"Dokter Umum / Puskesmas",visitDate:"2024-03-05",visitType:"Rawat Inap",weight:"50",height:"158",bmi:"20.0",waist:"70",hip:"88",whr:"0.80",systolicBp:"110",diastolicBp:"70",heartRate:"90",chiefComplaint:"Ruam malar, artritis, kelelahan, edema tungkai",onsetDate:"2023-02-01",onsetDuration:"4",onsetDurationUnit:"bulan",firstDiagnosisDate:"2023-06-15",firstDiagnosisPlace:"RSUP Adam Malik Medan",diagnosisDelay:"4 bulan",diagnosis:"Systemic Lupus Erythematosus (SLE)",diagnosisSecondary:"Lupus Nefritis kelas IV",diseaseActivity:"Aktivitas Tinggi",currentTherapy:"Prednison 40mg/hari + MMF 2g/hari + HCQ 400mg/hari",steroidUse:"Ya – dosis tinggi (>30mg)",nsaidUse:"Tidak",comorbidities:["Tidak Ada"],familyHistory:"Tidak",smoking:"Tidak Pernah",alcohol:"Tidak",hb:"8.2",wbc:"3.1",plt:"89",esr:"95",crp:"18",albumin:"2.9",creatinine:"1.6",gfr:"48",urineProtein:"+3",ana:"1:640 homogen",antidsDna:"Positif (>200 IU/mL)",antiSm:"Positif",c3:"45",c4:"8",sledai:"18",vas:"7",inputDate:"2024-03-05" },
  ]);
  const [attendance, setAttendance] = useState([
    { id:1,residentId:"res1",date:"2024-03-01",checkIn:"07:15",checkOut:"15:30",status:"present" },
    { id:2,residentId:"res1",date:"2024-03-04",checkIn:"07:45",checkOut:"16:00",status:"present" },
    { id:3,residentId:"res2",date:"2024-03-01",checkIn:"07:00",checkOut:"15:00",status:"present" },
  ]);
  const [showLogbookModal, setShowLogbookModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showPatientDetail, setShowPatientDetail] = useState(null);
  const [showMaterialDetail, setShowMaterialDetail] = useState(null);
  const [showCalculator, setShowCalculator] = useState(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [newLogbook, setNewLogbook] = useState({ type:"outpatient", date:new Date().toISOString().split("T")[0], patientName:"", diagnosis:"", topic:"", notes:"", fileName:"", fileData:"", fileType:"" });

  const S = {
    app:{ minHeight:"100vh", background:"#0f172a", fontFamily:"'IBM Plex Sans','Segoe UI',sans-serif", color:"#f1f5f9" },
    card:{ background:"#1e293b", borderRadius:16, padding:20, border:"1px solid #334155" },
    btn:(bg="#3b82f6")=>({ background:bg, border:"none", borderRadius:10, padding:"10px 18px", color:"white", fontWeight:700, cursor:"pointer", fontSize:14 }),
    input:{ width:"100%", background:"#0f172a", border:"1px solid #334155", borderRadius:8, padding:"10px 12px", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", marginBottom:12 },
    label:{ color:"#94a3b8", fontSize:12, fontWeight:600, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" },
    badge:(color)=>({ background:color+"22", color, borderRadius:6, padding:"3px 10px", fontSize:12, fontWeight:700, border:`1px solid ${color}44` }),
    modal:{ position:"fixed", inset:0, background:"#000000cc", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000, padding:20 },
    modalBox:{ background:"#1e293b", borderRadius:20, padding:28, width:"100%", maxWidth:560, maxHeight:"90vh", overflowY:"auto", border:"1px solid #334155" },
  };

  const login = () => {
    if(loginForm.role==="supervisor"&&loginForm.email==="supervisor@fkusu.ac.id") setCurrentUser({...USERS.supervisor});
    else { const r=USERS.residents.find(r=>r.email===loginForm.email); if(r)setCurrentUser({...r,role:"resident"}); else alert("Email tidak ditemukan."); }
  };
  const logout = () => { setCurrentUser(null); setActiveTab("dashboard"); };

  const register = async () => {
    const { fullName, nim, phone, email, password, confirmPassword } = regForm;
    if (!fullName || !nim || !email || !password) {
      setRegError("Semua field wajib diisi."); return;
    }
    if (password.length < 8) {
      setRegError("Password minimal 8 karakter."); return;
    }
    if (password !== confirmPassword) {
      setRegError("Konfirmasi password tidak cocok."); return;
    }
    if (!email.includes("@")) {
      setRegError("Format email tidak valid."); return;
    }
    setRegStatus("loading");
    setRegError("");
    // Simulate registration — in real app connect to Supabase signUp
    setTimeout(() => {
      setRegStatus("success");
    }, 1200);
  };
  const myLogbook = currentUser?.role==="supervisor"?logbookEntries:logbookEntries.filter(e=>e.residentId===currentUser?.id);
  const myPatients = currentUser?.role==="supervisor"?patients:patients.filter(p=>p.residentId===currentUser?.id);
  const myAttendance = currentUser?.role==="supervisor"?attendance:attendance.filter(a=>a.residentId===currentUser?.id);
  const filteredPatients = myPatients.filter(p=>{ const q=patientSearch.toLowerCase(); return !q||[p.mrn,p.initials,p.diagnosis,p.ethnicity,p.address,p.education,p.occupation].some(v=>v?.toString().toLowerCase().includes(q)); });
  const addLogbook = async () => {
    let fileUrl = "";
    let uploadMsg = "";
    // Upload ke Google Drive jika ada file dan jenis kegiatan mendukung
    if (newLogbook.fileData && ["cbd","journal","assignment"].includes(newLogbook.type)) {
      const result = await uploadToGoogleDrive({
        residentName: currentUser.name || currentUser.full_name,
        residentNim: currentUser.nim || "unknown",
        activityType: newLogbook.type,
        topic: newLogbook.topic,
        fileName: newLogbook.fileName,
        fileData: newLogbook.fileData,
        fileType: newLogbook.fileType,
        date: newLogbook.date
      });
      if (result.success) {
        fileUrl = result.fileUrl;
        uploadMsg = "✅ File berhasil dikirim ke Google Drive!";
      } else {
        uploadMsg = "⚠️ File tersimpan lokal. Drive: " + result.error;
      }
    }
    setLogbookEntries(prev => [...prev, {
      ...newLogbook,
      id: Date.now(),
      residentId: currentUser.id,
      status: "pending",
      fileUrl,
      uploadMsg
    }]);
    if (uploadMsg) alert(uploadMsg);
    setShowLogbookModal(false);
    setNewLogbook({ type:"outpatient", date:new Date().toISOString().split("T")[0], patientName:"", diagnosis:"", topic:"", notes:"", fileName:"", fileData:"", fileType:"" });
  };
  const addPatient = (data) => { setPatients(prev=>[...prev,{...data,id:Date.now(),residentId:currentUser.id}]); setShowPatientModal(false); };
  const approveLogbook = (id) => setLogbookEntries(prev=>prev.map(e=>e.id===id?{...e,status:"approved"}:e));
  const checkIn = () => {
    const today = new Date().toISOString().split("T")[0];
    if (attendance.find(a => a.residentId === currentUser.id && a.date === today)) {
      alert("Anda sudah check-in hari ini.");
      return;
    }
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          const locationStr = `${latitude.toFixed(6)}, ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`;
          setAttendance(prev => [...prev, {
            id: Date.now(), residentId: currentUser.id, date: today,
            checkIn: timeStr, checkOut: null, status: "present",
            location: locationStr, mapsUrl
          }]);
        },
        (err) => {
          // GPS gagal/ditolak — tetap check-in tanpa lokasi
          setAttendance(prev => [...prev, {
            id: Date.now(), residentId: currentUser.id, date: today,
            checkIn: timeStr, checkOut: null, status: "present",
            location: "Lokasi tidak tersedia", mapsUrl: null
          }]);
          console.warn("GPS error:", err.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setAttendance(prev => [...prev, {
        id: Date.now(), residentId: currentUser.id, date: today,
        checkIn: timeStr, checkOut: null, status: "present",
        location: "GPS tidak didukung", mapsUrl: null
      }]);
    }
  };
  const checkOut = () => { const today=new Date().toISOString().split("T")[0]; const now=new Date(); setAttendance(prev=>prev.map(a=>a.residentId===currentUser.id&&a.date===today?{...a,checkOut:`${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`}:a)); };
  const activityCounts = (resId) => { const entries=resId?logbookEntries.filter(e=>e.residentId===resId):myLogbook; return ACTIVITY_TYPES.map(a=>({...a,count:entries.filter(e=>e.type===a.id).length})); };

  if(!currentUser) return (
    <div style={{...S.app,display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:16}}>
      <div style={{width:"100%",maxWidth:460}}>

        {/* Logo Header */}
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:18,marginBottom:12}}>
            <img src={LOGO_USU} alt="USU" style={{width:68,height:68,borderRadius:"50%",objectFit:"cover",border:"2px solid #334155",background:"white"}}/>
            <div>
              <h1 style={{fontSize:30,fontWeight:900,background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",margin:0,lineHeight:1}}>RheumUSU</h1>
              <p style={{color:"#64748b",margin:"5px 0 0",fontSize:12}}>Divisi Reumatologi</p>
              <p style={{color:"#475569",margin:"2px 0 0",fontSize:11}}>FK-USU / RSUP Adam Malik</p>
            </div>
            <img src={LOGO_IRA} alt="IRA" style={{width:68,height:68,borderRadius:"50%",objectFit:"cover",border:"2px solid #334155",background:"white"}}/>
          </div>
        </div>

        {/* Tab toggle: Login / Daftar */}
        <div style={{display:"flex",gap:0,marginBottom:20,background:"#1e293b",borderRadius:12,padding:4,border:"1px solid #334155"}}>
          <button onClick={()=>{setShowRegister(false);setRegStatus(null);setRegError("");}}
            style={{flex:1,padding:"10px",borderRadius:9,border:"none",background:!showRegister?"linear-gradient(135deg,#3b82f6,#8b5cf6)":"transparent",color:"white",fontWeight:700,cursor:"pointer",fontSize:14,transition:"all 0.2s"}}>
            Masuk
          </button>
          <button onClick={()=>{setShowRegister(true);setRegStatus(null);setRegError("");}}
            style={{flex:1,padding:"10px",borderRadius:9,border:"none",background:showRegister?"linear-gradient(135deg,#10b981,#06b6d4)":"transparent",color:showRegister?"white":"#94a3b8",fontWeight:700,cursor:"pointer",fontSize:14,transition:"all 0.2s"}}>
            Daftar Akun Baru
          </button>
        </div>

        {/* ── LOGIN FORM ── */}
        {!showRegister && (
          <div style={S.card}>
            <div style={{display:"flex",gap:8,marginBottom:20}}>
              {["resident","supervisor"].map(r=><button key={r} onClick={()=>setLoginForm(p=>({...p,role:r}))}
                style={{flex:1,padding:10,borderRadius:10,border:`2px solid ${loginForm.role===r?"#3b82f6":"#334155"}`,background:loginForm.role===r?"#3b82f622":"transparent",color:loginForm.role===r?"#3b82f6":"#94a3b8",fontWeight:700,cursor:"pointer",fontSize:13}}>
                {r==="resident"?"👨‍⚕️ Residen":"👨‍🏫 Supervisor"}
              </button>)}
            </div>
            <label style={S.label}>Email</label>
            <input value={loginForm.email} onChange={e=>setLoginForm(p=>({...p,email:e.target.value}))}
              onKeyDown={e=>e.key==="Enter"&&login()}
              placeholder="Email Anda" style={S.input}/>
            <label style={S.label}>Password</label>
            <input type="password" value={loginForm.password} onChange={e=>setLoginForm(p=>({...p,password:e.target.value}))}
              onKeyDown={e=>e.key==="Enter"&&login()}
              placeholder="••••••••" style={S.input}/>
            <button onClick={login} style={{...S.btn("linear-gradient(135deg,#3b82f6,#8b5cf6)"),width:"100%",padding:13,fontSize:15,marginTop:6}}>
              Masuk
            </button>
            <div style={{marginTop:14,textAlign:"center",fontSize:12,color:"#475569"}}>
              Belum punya akun?{" "}
              <span onClick={()=>setShowRegister(true)} style={{color:"#3b82f6",cursor:"pointer",fontWeight:600}}>Daftar di sini</span>
            </div>
          </div>
        )}

        {/* ── REGISTER FORM ── */}
        {showRegister && (
          <div style={S.card}>
            {regStatus === "success" ? (
              <div style={{textAlign:"center",padding:"20px 0"}}>
                <div style={{fontSize:52,marginBottom:12}}>✅</div>
                <div style={{color:"#10b981",fontSize:20,fontWeight:900,marginBottom:8}}>Pendaftaran Berhasil!</div>
                <div style={{color:"#94a3b8",fontSize:14,marginBottom:6}}>Akun Anda telah didaftarkan.</div>
                <div style={{background:"#0f172a",borderRadius:10,padding:14,marginBottom:16,textAlign:"left"}}>
                  <div style={{color:"#64748b",fontSize:12,marginBottom:6,fontWeight:700}}>INFO AKUN ANDA:</div>
                  <div style={{color:"#f1f5f9",fontSize:13}}>👤 {regForm.fullName}</div>
                  <div style={{color:"#94a3b8",fontSize:12}}>NIM: {regForm.nim}</div>
                  <div style={{color:"#94a3b8",fontSize:12}}>📧 {regForm.email}</div>
                </div>
                <div style={{background:"#1e3a5f",borderRadius:10,padding:12,marginBottom:16,fontSize:12,color:"#94a3b8",textAlign:"left"}}>
                  ⚠️ <strong style={{color:"#f59e0b"}}>Menunggu aktivasi supervisor.</strong><br/>
                  Akun Anda akan diaktifkan oleh supervisor sebelum bisa login.<br/>
                  Hubungi: <span style={{color:"#3b82f6"}}>reumatofkusu@gmail.com</span>
                </div>
                <button onClick={()=>{setShowRegister(false);setRegStatus(null);setRegForm({fullName:"",nim:"",batch:"",phone:"",email:"",password:"",confirmPassword:"",angkatan:""});}}
                  style={{...S.btn("linear-gradient(135deg,#3b82f6,#8b5cf6)"),width:"100%",padding:12}}>
                  Kembali ke Login
                </button>
              </div>
            ) : (
              <>
                <div style={{color:"#10b981",fontWeight:700,fontSize:14,marginBottom:16,display:"flex",alignItems:"center",gap:8}}>
                  👨‍⚕️ Pendaftaran PPDS Reumatologi FK-USU
                </div>

                {/* Personal Info */}
                <div style={{color:"#3b82f6",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:8,paddingBottom:5,borderBottom:"1px solid #1e3a5f"}}>Data Pribadi</div>
                <label style={S.label}>Nama Lengkap (dengan gelar) *</label>
                <input value={regForm.fullName} onChange={e=>setRegForm(p=>({...p,fullName:e.target.value}))}
                  placeholder="dr. Nama Lengkap" style={S.input}/>

                <label style={S.label}>NIM *</label>
                <input value={regForm.nim} onChange={e=>setRegForm(p=>({...p,nim:e.target.value}))}
                  placeholder="2024001" style={S.input}/>

                <label style={S.label}>No. WhatsApp *</label>
                <input value={regForm.phone} onChange={e=>setRegForm(p=>({...p,phone:e.target.value}))}
                  placeholder="08xxxxxxxxxx" style={S.input}/>

                {/* Account Info */}
                <div style={{color:"#3b82f6",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",margin:"8px 0 8px",paddingBottom:5,borderBottom:"1px solid #1e3a5f"}}>Akun Login</div>
                <label style={S.label}>Email *</label>
                <input type="email" value={regForm.email} onChange={e=>setRegForm(p=>({...p,email:e.target.value}))}
                  placeholder="nama@ppds.fkusu.ac.id" style={S.input}/>

                <label style={S.label}>Password * (min. 8 karakter)</label>
                <input type="password" value={regForm.password} onChange={e=>setRegForm(p=>({...p,password:e.target.value}))}
                  placeholder="••••••••" style={S.input}/>

                <label style={S.label}>Konfirmasi Password *</label>
                <input type="password" value={regForm.confirmPassword} onChange={e=>setRegForm(p=>({...p,confirmPassword:e.target.value}))}
                  placeholder="••••••••" style={S.input}/>

                {regError && (
                  <div style={{background:"#ef444422",border:"1px solid #ef444444",borderRadius:8,padding:"10px 14px",marginBottom:12,color:"#ef4444",fontSize:13}}>
                    ⚠️ {regError}
                  </div>
                )}

                <button onClick={register} disabled={regStatus==="loading"}
                  style={{...S.btn("linear-gradient(135deg,#10b981,#06b6d4)"),width:"100%",padding:13,fontSize:15,marginTop:4,opacity:regStatus==="loading"?0.7:1}}>
                  {regStatus==="loading" ? "Mendaftarkan..." : "📝 Daftar Sekarang"}
                </button>

                <div style={{marginTop:12,background:"#0f172a",borderRadius:8,padding:"10px 12px",fontSize:11,color:"#64748b",lineHeight:1.7}}>
                  🔒 Data Anda aman dan hanya digunakan untuk keperluan akademik PPDS Reumatologi FK-USU.
                </div>

                <div style={{marginTop:10,textAlign:"center",fontSize:12,color:"#475569"}}>
                  Sudah punya akun?{" "}
                  <span onClick={()=>{setShowRegister(false);setRegError("");}} style={{color:"#3b82f6",cursor:"pointer",fontWeight:600}}>Masuk di sini</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const tabs = currentUser.role==="supervisor"
    ?[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"residents",label:"Residen",icon:"👥"},{id:"logbook",label:"Logbook",icon:"📋"},{id:"patients",label:"Pasien DB",icon:"🗃️"},{id:"attendance",label:"Absensi",icon:"📅"},{id:"materials",label:"Materi",icon:"📚"}]
    :[{id:"dashboard",label:"Dashboard",icon:"📊"},{id:"logbook",label:"Logbook",icon:"📋"},{id:"patients",label:"Pasien DB",icon:"🗃️"},{id:"attendance",label:"Absensi",icon:"📅"},{id:"materials",label:"Materi",icon:"📚"}];

  return (
    <div style={S.app}>
      <div style={{background:"#1e293b",borderBottom:"1px solid #334155",padding:"0 20px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src={LOGO_USU} alt="USU" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid #334155",background:"white"}}/>
            <div style={{marginLeft:2,marginRight:2}}>
              <div style={{fontWeight:900,fontSize:17,background:"linear-gradient(135deg,#3b82f6,#8b5cf6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>RheumUSU</div>
              <div style={{color:"#64748b",fontSize:10}}>PPDS Reumatologi · FK-USU / RSUP Adam Malik</div>
            </div>
            <img src={LOGO_IRA} alt="IRA" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",border:"2px solid #334155",background:"white"}}/>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <div style={{textAlign:"right"}}><div style={{color:"#f1f5f9",fontWeight:600,fontSize:14}}>{currentUser.name}</div><div style={{color:"#64748b",fontSize:11}}>{currentUser.role==="supervisor"?"Supervisor / Sp.PD-KR":`NIM: ${currentUser.nim}`}</div></div>
            <button onClick={logout} style={{...S.btn("#ef444422"),color:"#ef4444",border:"1px solid #ef444444",padding:"8px 14px"}}>Keluar</button>
          </div>
        </div>
      </div>
      <div style={{background:"#1e293b",borderBottom:"1px solid #334155",overflowX:"auto"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex"}}>
          {tabs.map(t=><button key={t.id} onClick={()=>setActiveTab(t.id)} style={{padding:"13px 18px",border:"none",borderBottom:`3px solid ${activeTab===t.id?"#3b82f6":"transparent"}`,background:"transparent",color:activeTab===t.id?"#3b82f6":"#94a3b8",fontWeight:600,cursor:"pointer",fontSize:13,whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:6}}><span>{t.icon}</span>{t.label}</button>)}
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>

        {activeTab==="dashboard"&&(
          <div>
            <h2 style={{color:"#f1f5f9",marginTop:0,marginBottom:20}}>{currentUser.role==="supervisor"?"Dashboard Supervisor":`Selamat datang, ${currentUser.name.split(" ")[1]}`}</h2>
            {currentUser.role==="supervisor"?(
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:14,marginBottom:24}}>
                  {[["👥","Total Residen",USERS.residents.length,"#3b82f6"],["📋","Total Logbook",logbookEntries.length,"#8b5cf6"],["⏳","Menunggu Approval",logbookEntries.filter(e=>e.status==="pending").length,"#f59e0b"],["🗃️","Total Pasien DB",patients.length,"#10b981"]].map(([icon,label,val,color])=>(
                    <div key={label} style={{...S.card,textAlign:"center",padding:16}}><div style={{fontSize:28}}>{icon}</div><div style={{fontSize:26,fontWeight:900,color}}>{val}</div><div style={{color:"#64748b",fontSize:12}}>{label}</div></div>
                  ))}
                </div>
                {USERS.residents.map(r=>{const counts=activityCounts(r.id);const total=counts.reduce((s,a)=>s+a.count,0);const totalTarget=counts.reduce((s,a)=>s+a.target,0);const pct=Math.round((total/totalTarget)*100);return(
                  <div key={r.id} style={{...S.card,marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                      <div><div style={{fontWeight:700,color:"#f1f5f9"}}>{r.name}</div><div style={{color:"#64748b",fontSize:12}}>Angkatan {r.batch} · NIM {r.nim}</div></div>
                      <div style={{textAlign:"right"}}><div style={{fontWeight:900,fontSize:20,color:"#3b82f6"}}>{pct}%</div><div style={{color:"#64748b",fontSize:12}}>{total}/{totalTarget}</div></div>
                    </div>
                    <div style={{background:"#0f172a",borderRadius:100,height:7,overflow:"hidden"}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:"linear-gradient(90deg,#3b82f6,#8b5cf6)",borderRadius:100}}/></div>
                  </div>
                );})}
              </>
            ):(
              <>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10,marginBottom:20}}>
                  {activityCounts().map(a=><div key={a.id} style={{...S.card,padding:14,textAlign:"center"}}><div style={{fontSize:22}}>{a.icon}</div><div style={{fontWeight:900,fontSize:22,color:a.color}}>{a.count}<span style={{color:"#475569",fontSize:12}}>/{a.target}</span></div><div style={{color:"#64748b",fontSize:11,marginBottom:6}}>{a.label}</div><div style={{background:"#0f172a",borderRadius:100,height:4}}><div style={{width:`${Math.min((a.count/a.target)*100,100)}%`,height:"100%",background:a.color,borderRadius:100}}/></div></div>)}
                </div>
                <div style={S.card}>
                  <div style={{fontWeight:700,marginBottom:10,color:"#94a3b8",fontSize:12,textTransform:"uppercase"}}>Absensi Hari Ini</div>
                  {(()=>{const today=new Date().toISOString().split("T")[0];const todayAtt=attendance.find(a=>a.residentId===currentUser.id&&a.date===today);return todayAtt?(
                      <div>
                        <div style={{display:"flex",gap:20,alignItems:"center",marginBottom:8}}>
                          <div><div style={{color:"#10b981",fontWeight:700,fontSize:12}}>CHECK-IN</div><div style={{color:"#f1f5f9",fontSize:20,fontWeight:900}}>{todayAtt.checkIn}</div></div>
                          {todayAtt.checkOut?<div><div style={{color:"#ef4444",fontWeight:700,fontSize:12}}>CHECK-OUT</div><div style={{color:"#f1f5f9",fontSize:20,fontWeight:900}}>{todayAtt.checkOut}</div></div>:<button onClick={checkOut} style={{...S.btn("#ef444422"),color:"#ef4444",border:"1px solid #ef444444"}}>🚪 Check-Out</button>}
                        </div>
                        {todayAtt.location&&<div style={{fontSize:12,color:"#64748b"}}>
                          📍 {todayAtt.mapsUrl
                            ?<a href={todayAtt.mapsUrl} target="_blank" rel="noreferrer" style={{color:"#3b82f6",textDecoration:"none"}}>{todayAtt.location}</a>
                            :todayAtt.location}
                        </div>}
                      </div>
                    ):(<button onClick={checkIn} style={{...S.btn("#10b98133"),color:"#10b981",border:"1px solid #10b98144",padding:"12px 24px",fontSize:14}}>📍 Check-In + Lokasi</button>);})()}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab==="residents"&&currentUser.role==="supervisor"&&(
          <div>
            <h2 style={{color:"#f1f5f9",marginTop:0}}>Daftar Residen</h2>
            {USERS.residents.map(r=>(
              <div key={r.id} style={{...S.card,marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:8}}>
                  <div><div style={{fontWeight:700,fontSize:15,color:"#f1f5f9"}}>{r.name}</div><div style={{color:"#64748b",fontSize:12}}>NIM: {r.nim} · Angkatan {r.batch} · {r.email}</div></div>
                  <div style={{display:"flex",gap:8}}><span style={S.badge("#10b981")}>{logbookEntries.filter(e=>e.residentId===r.id&&e.status==="approved").length} Approved</span><span style={S.badge("#f59e0b")}>{logbookEntries.filter(e=>e.residentId===r.id&&e.status==="pending").length} Pending</span></div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))",gap:8}}>
                  {activityCounts(r.id).map(a=><div key={a.id} style={{background:"#0f172a",borderRadius:10,padding:"10px 12px",textAlign:"center"}}><div style={{fontSize:16}}>{a.icon}</div><div style={{fontWeight:700,color:a.color,fontSize:16}}>{a.count}<span style={{color:"#475569",fontSize:11}}>/{a.target}</span></div><div style={{color:"#64748b",fontSize:10}}>{a.label}</div></div>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="logbook"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h2 style={{color:"#f1f5f9",margin:0}}>Logbook Kegiatan</h2>
              {currentUser.role==="resident"&&<button onClick={()=>setShowLogbookModal(true)} style={S.btn("linear-gradient(135deg,#3b82f6,#8b5cf6)")}>+ Tambah</button>}
            </div>
            {myLogbook.sort((a,b)=>b.date.localeCompare(a.date)).map(e=>{const act=ACTIVITY_TYPES.find(a=>a.id===e.type);const res=USERS.residents.find(r=>r.id===e.residentId);return(
              <div key={e.id} style={{...S.card,display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:10}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:5,flexWrap:"wrap"}}><span style={{fontSize:16}}>{act?.icon}</span><span style={{fontWeight:700,color:act?.color}}>{act?.label}</span><span style={{color:"#64748b",fontSize:12}}>{e.date}</span>{currentUser.role==="supervisor"&&<span style={{color:"#94a3b8",fontSize:12}}>· {res?.name}</span>}</div>
                  {e.patientName&&<div style={{color:"#94a3b8",fontSize:13}}>👥 {e.patientName} — {e.diagnosis}</div>}
                  {e.topic&&<div style={{color:"#94a3b8",fontSize:13}}>📌 {e.topic}</div>}
                  {e.notes&&<div style={{color:"#64748b",fontSize:12,marginTop:3}}>{e.notes}</div>}
                  {e.fileName&&(
                    <div style={{marginTop:5,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                      {e.fileUrl ? (
                        <a href={e.fileUrl} target="_blank" rel="noreferrer"
                          style={{display:"inline-flex",alignItems:"center",gap:6,background:"#10b98122",border:"1px solid #10b98144",borderRadius:8,padding:"4px 10px",color:"#10b981",fontSize:12,textDecoration:"none",fontWeight:600}}>
                          📄 {e.fileName}
                          <span style={{fontSize:10}}>↗ Lihat di Drive</span>
                        </a>
                      ) : (
                        <a href={e.fileData} download={e.fileName}
                          style={{display:"inline-flex",alignItems:"center",gap:6,background:"#1e3a5f",border:"1px solid #3b82f644",borderRadius:8,padding:"4px 10px",color:"#3b82f6",fontSize:12,textDecoration:"none",fontWeight:600}}>
                          📄 {e.fileName}
                          <span style={{fontSize:10,color:"#64748b"}}>↓ Unduh Lokal</span>
                        </a>
                      )}
                      {e.fileUrl&&<span style={{fontSize:10,color:"#10b981"}}>✓ Tersimpan di Google Drive</span>}
                    </div>
                  )}
                </div>
                <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                  <span style={S.badge(e.status==="approved"?"#10b981":"#f59e0b")}>{e.status==="approved"?"✓ Approved":"⏳ Pending"}</span>
                  {currentUser.role==="supervisor"&&e.status==="pending"&&<button onClick={()=>approveLogbook(e.id)} style={{...S.btn("#10b98133"),color:"#10b981",border:"1px solid #10b98144",padding:"5px 12px",fontSize:12}}>Approve</button>}
                </div>
              </div>
            );})}
            {myLogbook.length===0&&<div style={{...S.card,textAlign:"center",color:"#64748b",padding:40}}>Belum ada kegiatan.</div>}
          </div>
        )}

        {activeTab==="patients"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:10}}>
              <div>
                <h2 style={{color:"#f1f5f9",margin:0}}>Database Pasien Penelitian</h2>
                <div style={{color:"#64748b",fontSize:12,marginTop:2}}>{filteredPatients.length} pasien · {myPatients.length} total</div>
              </div>
              {currentUser.role==="resident"&&<button onClick={()=>setShowPatientModal(true)} style={S.btn("linear-gradient(135deg,#10b981,#06b6d4)")}>+ Tambah Pasien</button>}
            </div>
            <input value={patientSearch} onChange={e=>setPatientSearch(e.target.value)} placeholder="🔍 Cari No.RM, nama, diagnosis, suku, pendidikan, pekerjaan..." style={{...S.input,marginBottom:14}}/>
            <div style={{display:"grid",gap:12}}>
              {filteredPatients.map(p=>{
                const res=USERS.residents.find(r=>r.id===p.residentId);
                const bmiNum=parseFloat(p.bmi);
                const bmiColor=bmiNum>=27.5?"#ef4444":bmiNum>=23?"#f59e0b":"#10b981";
                return(
                  <div key={p.id} style={{...S.card,cursor:"pointer"}} onClick={()=>setShowPatientDetail(p)}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",marginBottom:5}}>
                          <span style={{fontWeight:900,color:"#f1f5f9",fontSize:15}}>{p.initials||p.mrn}</span>
                          <span style={{...S.badge("#64748b"),fontSize:11}}>{p.mrn}</span>
                          <span style={{...S.badge("#3b82f6"),fontSize:11}}>{p.age}th / {p.gender==="P"?"♀":"♂"}</span>
                          {p.ethnicity&&<span style={{...S.badge("#8b5cf6"),fontSize:11}}>{p.ethnicity}</span>}
                          {p.marital&&<span style={{...S.badge("#06b6d4"),fontSize:11}}>{p.marital}</span>}
                        </div>
                        <div style={{color:"#3b82f6",fontWeight:700,fontSize:14}}>{p.diagnosis}</div>
                        {p.diagnosisSecondary&&<div style={{color:"#64748b",fontSize:12}}>+ {p.diagnosisSecondary}</div>}
                      </div>
                      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                        {p.diseaseActivity&&<span style={S.badge(p.diseaseActivity.includes("Tinggi")||p.diseaseActivity.includes("Flare")?"#ef4444":p.diseaseActivity.includes("Sedang")?"#f59e0b":p.diseaseActivity.includes("Rendah")?"#10b981":"#06b6d4")}>{p.diseaseActivity}</span>}
                        {currentUser.role==="supervisor"&&<span style={{...S.badge("#475569"),fontSize:11}}>{res?.name.split(" ")[1]}</span>}
                      </div>
                    </div>
                    <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                      {p.education&&<div style={{fontSize:12,color:"#64748b"}}>🎓 {p.education}</div>}
                      {p.occupation&&<div style={{fontSize:12,color:"#64748b"}}>💼 {p.occupation.split("/")[0]}</div>}
                      {p.referralSource&&<div style={{fontSize:12,color:"#64748b"}}>📨 {p.referralSource.split("(")[0].trim()}</div>}
                      {p.bmi&&<div style={{fontSize:12,color:bmiColor}}>⚖ IMT {p.bmi}</div>}
                      {p.waist&&<div style={{fontSize:12,color:"#64748b"}}>📏 Pinggang {p.waist}cm</div>}
                      {p.diagnosisDelay&&<div style={{fontSize:12,color:"#f59e0b"}}>⏱ Delay {p.diagnosisDelay}</div>}
                      {p.das28&&<div style={{fontSize:12,color:"#94a3b8"}}>DAS28: {p.das28}</div>}
                      {p.sledai&&<div style={{fontSize:12,color:"#94a3b8"}}>SLEDAI: {p.sledai}</div>}
                      {p.comorbidities?.length>0&&p.comorbidities[0]!=="Tidak Ada"&&<div style={{fontSize:12,color:"#ef444499"}}>🏥 {p.comorbidities.slice(0,2).join(", ")}</div>}
                    </div>
                    <div style={{marginTop:8,fontSize:11,color:"#334155",textAlign:"right"}}>Klik untuk detail lengkap →</div>
                  </div>
                );
              })}
              {filteredPatients.length===0&&<div style={{...S.card,textAlign:"center",color:"#64748b",padding:40}}>Tidak ada data pasien yang sesuai.</div>}
            </div>
          </div>
        )}

        {activeTab==="attendance"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18}}>
              <h2 style={{color:"#f1f5f9",margin:0}}>Absensi</h2>
              {currentUser.role==="resident"&&<div style={{display:"flex",gap:8}}>
                <button onClick={checkIn} style={{...S.btn("#10b98133"),color:"#10b981",border:"1px solid #10b98144"}}>📍 Check-In + Lokasi</button>
                <button onClick={checkOut} style={{...S.btn("#ef444422"),color:"#ef4444",border:"1px solid #ef444444"}}>🚪 Check-Out</button>
              </div>}
            </div>
            {myAttendance.sort((a,b)=>b.date.localeCompare(a.date)).map(a=>{const res=USERS.residents.find(r=>r.id===a.residentId);return(
              <div key={a.id} style={{...S.card,padding:"14px 18px",marginBottom:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:8}}>
                  <div>
                    <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:4}}>
                      <div style={{fontWeight:700,color:"#f1f5f9"}}>{a.date}</div>
                      {currentUser.role==="supervisor"&&<div style={{color:"#94a3b8",fontSize:13}}>{res?.name}</div>}
                      <span style={S.badge("#10b981")}>Hadir</span>
                    </div>
                    {a.location&&(
                      <div style={{fontSize:12,color:"#64748b",marginTop:2}}>
                        📍 {a.mapsUrl
                          ?<a href={a.mapsUrl} target="_blank" rel="noreferrer" style={{color:"#3b82f6",textDecoration:"none"}}>{a.location} ↗</a>
                          :a.location}
                      </div>
                    )}
                  </div>
                  <div style={{display:"flex",gap:16,alignItems:"center"}}>
                    <div style={{textAlign:"center"}}><div style={{color:"#64748b",fontSize:10}}>CHECK-IN</div><div style={{color:"#10b981",fontWeight:700,fontSize:15}}>{a.checkIn}</div></div>
                    {a.checkOut&&<div style={{textAlign:"center"}}><div style={{color:"#64748b",fontSize:10}}>CHECK-OUT</div><div style={{color:"#ef4444",fontWeight:700,fontSize:15}}>{a.checkOut}</div></div>}
                  </div>
                </div>
              </div>
            );})}
            {myAttendance.length===0&&<div style={{...S.card,textAlign:"center",color:"#64748b",padding:40}}>Belum ada absensi.</div>}
          </div>
        )}

        {activeTab==="materials"&&(
          <div>
            <h2 style={{color:"#f1f5f9",marginTop:0}}>Materi & Kalkulator Reumatologi</h2>
            {RHEUM_MATERIALS.map(cat=>(
              <div key={cat.category} style={{marginBottom:24}}>
                <h3 style={{color:"#94a3b8",fontSize:12,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:10}}>{cat.category}</h3>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:10}}>
                  {cat.items.map(item=><div key={item.title} style={{...S.card,cursor:"pointer"}} onClick={()=>item.isCalculator?setShowCalculator(item.isCalculator):setShowMaterialDetail(item)}><div style={{fontWeight:700,color:"#f1f5f9",marginBottom:6,fontSize:14}}>{item.title}</div><div style={{color:"#64748b",fontSize:12}}>{item.desc}</div><div style={{marginTop:10,color:item.isCalculator?"#10b981":"#3b82f6",fontSize:12,fontWeight:600}}>{item.isCalculator?"🔢 Buka Kalkulator →":"📖 Lihat Detail →"}</div></div>)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showLogbookModal&&(
        <div style={S.modal} onClick={()=>setShowLogbookModal(false)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <h3 style={{color:"#f1f5f9",marginTop:0}}>Tambah Logbook</h3>
            <label style={S.label}>Jenis Kegiatan</label>
            <select value={newLogbook.type} onChange={e=>setNewLogbook(p=>({...p,type:e.target.value}))} style={S.input}>{ACTIVITY_TYPES.map(a=><option key={a.id} value={a.id}>{a.icon} {a.label}</option>)}</select>
            <label style={S.label}>Tanggal</label>
            <input type="date" value={newLogbook.date} onChange={e=>setNewLogbook(p=>({...p,date:e.target.value}))} style={S.input}/>
            {["outpatient","inpatient"].includes(newLogbook.type)&&<><label style={S.label}>Nama Pasien</label><input value={newLogbook.patientName} onChange={e=>setNewLogbook(p=>({...p,patientName:e.target.value}))} placeholder="Inisial" style={S.input}/><label style={S.label}>Diagnosis</label><select value={newLogbook.diagnosis} onChange={e=>setNewLogbook(p=>({...p,diagnosis:e.target.value}))} style={S.input}><option value="">Pilih...</option>{DIAGNOSES.map(d=><option key={d}>{d}</option>)}</select></>}
            {["cbd","journal","assignment","bst","minicex","dops"].includes(newLogbook.type)&&<><label style={S.label}>Topik / Judul</label><input value={newLogbook.topic} onChange={e=>setNewLogbook(p=>({...p,topic:e.target.value}))} placeholder="Judul/topik kegiatan" style={S.input}/></>}
            {["cbd","journal","assignment"].includes(newLogbook.type)&&(
              <div>
                <label style={S.label}>Upload File Materi (PDF/PPT/DOC)</label>
                <div style={{border:"2px dashed #334155",borderRadius:10,padding:16,textAlign:"center",marginBottom:12,background:"#0f172a",cursor:"pointer"}}
                  onClick={()=>document.getElementById("fileUpload").click()}>
                  {newLogbook.fileName?(
                    <div>
                      <div style={{fontSize:24,marginBottom:6}}>📄</div>
                      <div style={{color:"#10b981",fontWeight:600,fontSize:13}}>{newLogbook.fileName}</div>
                      <div style={{color:"#64748b",fontSize:11,marginTop:3}}>Klik untuk ganti file</div>
                    </div>
                  ):(
                    <div>
                      <div style={{fontSize:28,marginBottom:6}}>📤</div>
                      <div style={{color:"#94a3b8",fontSize:13,fontWeight:600}}>Klik untuk pilih file</div>
                      <div style={{color:"#64748b",fontSize:11,marginTop:3}}>PDF, PPT, PPTX, DOC, DOCX (maks. 10MB)</div>
                    </div>
                  )}
                </div>
                <input id="fileUpload" type="file" accept=".pdf,.ppt,.pptx,.doc,.docx"
                  style={{display:"none"}}
                  onChange={e=>{
                    const file = e.target.files[0];
                    if(!file) return;
                    if(file.size > 10*1024*1024){ alert("File terlalu besar! Maksimal 10MB."); return; }
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setNewLogbook(p=>({...p, fileName:file.name, fileData:ev.target.result, fileType:file.type, fileUrl:"", uploadStatus:"" }));
                    };
                    reader.readAsDataURL(file);
                  }}/>
                {newLogbook.fileName&&(
                  <div style={{display:"flex",justifyContent:"flex-end"}}>
                    <button onClick={()=>setNewLogbook(p=>({...p,fileName:"",fileData:"",fileType:""}))}
                      style={{background:"#ef444422",border:"1px solid #ef444444",borderRadius:8,color:"#ef4444",padding:"4px 10px",cursor:"pointer",fontSize:12}}>
                      ✕ Hapus file
                    </button>
                  </div>
                )}
                <div style={{background:"#1e3a5f",borderRadius:8,padding:"8px 12px",fontSize:11,color:"#64748b",marginBottom:4}}>
                  📁 File akan otomatis dikirim ke <span style={{color:"#10b981",fontWeight:600}}>Google Drive divisi</span><br/>
                  Struktur: <span style={{color:"#94a3b8"}}>NIM - Nama &gt; Jenis Kegiatan &gt; File</span>
                </div>
              </div>
            )}
            <label style={S.label}>Catatan</label>
            <textarea value={newLogbook.notes} onChange={e=>setNewLogbook(p=>({...p,notes:e.target.value}))} rows={3} style={{...S.input,resize:"vertical"}}/>
            <div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><button onClick={()=>setShowLogbookModal(false)} style={{...S.btn("#334155"),color:"#94a3b8"}}>Batal</button><button onClick={addLogbook} style={S.btn("linear-gradient(135deg,#3b82f6,#8b5cf6)")}>Simpan</button></div>
          </div>
        </div>
      )}

      {showPatientModal&&<PatientForm onClose={()=>setShowPatientModal(false)} onSave={addPatient}/>}
      {showPatientDetail&&<PatientDetail patient={showPatientDetail} onClose={()=>setShowPatientDetail(null)}/>}

      {showMaterialDetail&&(
        <div style={S.modal} onClick={()=>setShowMaterialDetail(null)}>
          <div style={S.modalBox} onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}><h3 style={{color:"#f1f5f9",margin:0}}>{showMaterialDetail.title}</h3><button onClick={()=>setShowMaterialDetail(null)} style={{background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:22}}>×</button></div>
            <pre style={{color:"#94a3b8",fontSize:13,whiteSpace:"pre-wrap",lineHeight:1.8,background:"#0f172a",padding:16,borderRadius:10,fontFamily:"inherit"}}>{showMaterialDetail.detail}</pre>
          </div>
        </div>
      )}

      {showCalculator&&(
        <div style={S.modal} onClick={()=>setShowCalculator(null)}>
          <div onClick={e=>e.stopPropagation()} style={{overflowY:"auto",maxHeight:"95vh"}}>
            {showCalculator==="das28"&&<DAS28Calc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="sdai"&&<SDAICalc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="cdai"&&<CDAICalc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="sledai2k"&&<SLEDAI2KCalc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="mexsledai"&&<MEXSLEDAICalc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="sle2019"&&<SLE2019Calc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="basdai"&&<BASDAICalc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="basfi"&&<BASFICalc onClose={()=>setShowCalculator(null)}/>}
            {showCalculator==="schober"&&<SchoberCalc onClose={()=>setShowCalculator(null)}/>}
          </div>
        </div>
      )}
    </div>
  );
}
