/**
 * Data Resmi Katalog Produk ATVIA
 * Formulasi Detailing Presisi & Standar Laboratorium:
 * 1. Waterspot Cleaner (500 ml)
 * 2. Interior Guard (500 ml)
 * 3. Action Black Dressing (500 ml)
 * 4. Tire Shine Protection (1 Liter)
 * 5. Advance Coating (500 ml)
 */
export const products = [
  {
    id: '01',
    slug: 'waterspot-cleaner',
    name: 'Waterspot Cleaner',
    category: 'Pembersih Khusus & Kaca',
    categoryKey: 'glass',
    volume: '500 ml',
    image: '/images/waterspot-cleaner.jpg',
    highlightBadge: 'Zero Spot Formula',
    solvesProblem: 'Jamur kaca & kerak noda air mineral',
    summary: 'Formula Zero Spot untuk melarutkan deposit mineral, waterspot membandel, dan jamur kaca tanpa mengikis permukaan.',
    description: 'ATVIA Waterspot Cleaner dengan Zero Spot Formula dirancang khusus melalui reaksi pelarutan mineral terarah untuk meluruhkan noda deposit air hujan asam, jamur kaca, dan residu kalsium/magnesium membandel. Bekerja cepat melunakkan kontaminan tanpa perlu amplas atau penggosokan agresif, mengembalikan visibilitas optik kaca serta kilau panel bodi tanpa meninggalkan residu lengket.',
    benefits: [
      'Zero Spot Formula yang aktif melarutkan kerak mineral dan jamur kaca dalam hitungan detik',
      'Non-Abrasive Action: membersihkan secara kimiawi terukur tanpa menggores atau mengikis kaca',
      'Aman untuk kaca samping, kaca belakang, emblem krom, sela pintu, dan kisi-kisi radiator'
    ],
    specs: {
      formula: 'Mineral Acid Complex & Surfactant Biodegradable',
      ph: 'pH 3.5 (Asam Terarah Non-Korosif)',
      compatibleSurfaces: 'Kaca samping, kaca belakang, emblem krom, kisi-kisi gril eksterior',
      finish: 'Ultra-Clear Optical Glass, Bebas Kabut & Zero Residue',
      curingTime: 'Bilas instan (Maksimal 60 detik per panel kerja)',
      yield: '15–20 Kendaraan (Aplikasi Kaca Samping & Belakang Menyeluruh)',
      durability: 'Permukaan bersih murni siap dilapisi sealant/coating'
    },
    applicationSteps: [
      {
        step: 1,
        title: 'Pembersihan & Pendinginan',
        instruction: 'Cuci bersih panel kendaraan dari debu kasar dan pasir. Pastikan permukaan kaca dingin saat disentuh dan tidak berada di bawah terik matahari langsung.'
      },
      {
        step: 2,
        title: 'Penuangan Terukur',
        instruction: 'Kenakan sarung tangan karet/nitril. Tuangkan sedikit cairan Waterspot Cleaner ke busa aplikator atau kain microfiber yang sedikit lembap.'
      },
      {
        step: 3,
        title: 'Usapan Searah Panel Kecil',
        instruction: 'Usapkan merata dengan tekanan sedang pada area kerja berukuran ± 30x30 cm dengan gerakan lurus vertikal-horizontal hingga noda air terangkat.'
      },
      {
        step: 4,
        title: 'Pembilasan Air Mengalir Segera',
        instruction: 'Jangan biarkan cairan mengering sendiri. Segera bilas dengan air bersih mengalir melimpah dalam waktu maksimal 60 detik setelah pengusapan.'
      },
      {
        step: 5,
        title: 'Pengeringan Sempurna',
        instruction: 'Keringkan dengan kain microfiber kering terpisah dan periksa kejernihan kaca dari berbagai sudut pencahayaan.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Gunakan selalu sarung tangan pelindung saat aplikasi.',
        'Kerjakan panel demi panel kecil agar kontrol bilasan air selalu tepat waktu.',
        'Bilas menggunakan air bersih mengalir melimpah segera setelah noda larut.',
        'Simpan botol di tempat sejuk terlindung dari sinar matahari langsung.'
      ],
      donts: [
        'JANGAN gunakan pada kaca depan utama (windshield) mobil Eropa atau kaca berfilm sensor luar khusus.',
        'JANGAN aplikasikan pada kaca spion cermin lipat elektrik tanpa pengujian di sudut tersembunyi.',
        'JANGAN biarkan cairan mengering sendiri di atas permukaan cat atau kaca.',
        'JANGAN aplikasikan saat kap mesin atau kaca mobil masih dalam keadaan panas.'
      ]
    },
    toolsRecommended: [
      'Sarung Tangan Nitril / Karet',
      '2x Kain Microfiber Bersih (Satu Aplikasi, Satu Pengering)',
      'Busa Aplikator Khusus Kaca',
      'Selang Air Mengalir / Semprotan Bilas'
    ],
    sequenceStep: 1,
    sequencePhase: 'Pembersihan & Dekontaminasi',
    sequenceRole: 'Membersihkan jamur kaca dan kerak mineral sebelum tahap perawatan permukaan bodi.',
    imagePlaceholder: 'Waterspot Cleaner — 500 ml'
  },
  {
    id: '02',
    slug: 'interior-guard',
    name: 'Interior Guard',
    category: 'Perawatan Interior',
    categoryKey: 'interior',
    volume: '500 ml',
    image: '/images/interior-guard.jpg',
    highlightBadge: 'Luxury Freshness',
    solvesProblem: 'Debu kabin, dasbor kusam & aroma apek',
    summary: 'Pembersih dan pelindung kabin untuk mengangkat debu, memberi kilap natural, serta kesegaran mewah tahan lama.',
    description: 'ATVIA Interior Guard menghadirkan Luxury Freshness Inside untuk membersihkan sekaligus memproteksi material kabin kendaraan dari penuaan dini akibat paparan panas terik. Efektif mengangkat partikel debu halus dan residu minyak pada dasbor vinil, trim pintu, konsol tengah, dan jok kulit sintetis, meninggalkan sentuhan satin halus non-greasy serta aroma kabin eksekutif yang bertahan berminggu-minggu.',
    benefits: [
      'Luxury Freshness Inside: kesegaran aroma kabin mewah yang menetralkan bau apek',
      'Anti-Static & UV Shield: menolak penempelan debu halus dan melindungi dasbor dari retak kusam',
      'Sentuhan akhir satin alami yang tidak berminyak, tidak licin, dan tidak menyilaukan kaca depan'
    ],
    specs: {
      formula: 'Water-Based Emulsion & UV Barrier Polymer',
      ph: 'pH 7.0 (Netral Lembut Teruji Aman)',
      compatibleSurfaces: 'Dasbor vinil, panel plastik tekstur, doortrim, kulit sintetis (PU/PVC)',
      finish: 'Natural Satin Touch (Non-Greasy & Bebas Lengket)',
      scent: 'Signature Executive Fresh (Aroma Segar Mewah)',
      yield: '25–35 Unit Kendaraan Interior Lengkap',
      durability: 'Proteksi debu statis hingga 3–4 Minggu'
    },
    applicationSteps: [
      {
        step: 1,
        title: 'Pembersihan Debu Kasar',
        instruction: 'Vacuum kabin atau seka kotoran kasar pada area dasbor dan jok menggunakan kuas halus atau lap lembap.'
      },
      {
        step: 2,
        title: 'Semprot ke Kain Lap',
        instruction: 'Semprotkan 2–3 semprotan Interior Guard langsung ke permukaan kain microfiber (hindari menyemprot langsung ke celah tombol audio/listrik).'
      },
      {
        step: 3,
        title: 'Perataan & Pengangkatan Noda',
        instruction: 'Usapkan kain microfiber secara merata pada dasbor, konsol tengah, panel kemudi, dan jok kulit sintetis hingga noda terangkat.'
      },
      {
        step: 4,
        title: 'Finishing Buff Kering',
        instruction: 'Balik kain ke sisi yang kering untuk menyeka sisa residu hingga muncul kilap satin bersih yang bebas lengket.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Semprotkan cairan ke lap terlebih dahulu untuk mencegah semprotan embun mengenai kaca depan bagian dalam.',
        'Aplikasikan secara teratur setiap 2 minggu untuk menjaga kelenturan dasbor dari radiasi panas kaca.',
        'Sangat aman untuk permukaan plastik bertekstur, kisi-kisi AC, dan panel konsol interior.'
      ],
      donts: [
        'JANGAN disemprotkan ke pedal gas, pedal rem, kopling, atau lingkar kemudi bagian genggaman.',
        'JANGAN gunakan pada bahan suede / alcantara asli (gunakan cairan pembersih suede khusus).',
        'JANGAN gunakan kain yang sudah kotor atau mengandung bekas sabun keras.'
      ]
    },
    toolsRecommended: [
      'Kain Microfiber Khusus Interior (Short-pile 300 GSM)',
      'Kuas Detailing Interior Bulu Lembut (Boar Hair)',
      'Spons Aplikator Busa Lembut'
    ],
    sequenceStep: 4,
    sequencePhase: 'Finishing & Interior',
    sequenceRole: 'Penyegaran dan perlindungan ruang kabin setelah perawatan eksterior selesai.',
    imagePlaceholder: 'Interior Guard — 500 ml'
  },
  {
    id: '03',
    slug: 'action-black-dressing',
    name: 'Action Black Dressing',
    category: 'Restorasi Plastik & Trim',
    categoryKey: 'trim-tire',
    volume: '500 ml',
    image: '/images/action-black-dressing.jpg',
    highlightBadge: 'Back to Black',
    solvesProblem: 'Bodi plastik kasar & karet memutih kusam',
    summary: 'Formula Back to Black untuk menghitamkan bodi plastik, kulit, dan karet kusam serta proteksi sinar UV.',
    description: 'ATVIA Action Black Dressing dengan teknologi formula Back to Black dirancang khusus untuk memulihkan warna hitam pekat natural pada plastik eksterior bertekstur kulit jeruk (unpainted trim), karet talang, mudguard, dan spatbor yang memutih akibat cuaca tropis. Polimer mikro meresap ke dalam pori-pori plastik, mengikat pigmen pelindung yang tahan bilasan air hujan dan tidak luntur.',
    benefits: [
      'Formula Back to Black yang mengembalikan kehitaman pekat alami tanpa terlihat basah palsu',
      'Weather & UV Shield: melindungi trim bodi dari oksidasi matahari dan retak penuaan dini',
      'Formula meresap ke dalam pori substrat, tidak mudah luntur dan tahan cuci berkali-kali'
    ],
    specs: {
      formula: 'High-Refined Micro Polymer Pigment & Weather Shield',
      ph: 'Netral (Bebas Pelarut Asam Korosif)',
      compatibleSurfaces: 'Trim plastik kulit jeruk, mudguard, cover spion hitam, wiper cowl, karet talang',
      finish: 'Deep Rich Matte-to-Satin Natural',
      curingTime: 'Kering sentuh 10 menit, Ikatan sempurna 24 jam',
      yield: '20–30 Bagian Trim Lengkap Mobil / Puluhan Motor',
      durability: 'Tahan Cuci & Air Hujan 1 hingga 3 Bulan'
    },
    applicationSteps: [
      {
        step: 1,
        title: 'Degreasing Substrat',
        instruction: 'Bersihkan trim plastik dari debu, oli, dan sisa silikon lama menggunakan sabun pembersih. Keringkan sempurna.'
      },
      {
        step: 2,
        title: 'Kocok & Tuang Sedikit',
        instruction: 'Kocok botol perlahan agar emulsi pigmen menyatu. Tuangkan beberapa tetes cairan ke busa aplikator padat.'
      },
      {
        step: 3,
        title: 'Ratakan Mengikuti Alur',
        instruction: 'Oleskan merata searah tekstur plastik kulit jeruk. Pastikan seluruh lekukan dan sudut terisi pigmen secara merata.'
      },
      {
        step: 4,
        title: 'Jeda Peresapan',
        instruction: 'Biarkan selama 10–15 menit agar formula polimer mengikat pori-pori plastik secara mendalam.'
      },
      {
        step: 5,
        title: 'Lap Ringan Residu',
        instruction: 'Seka ringan permukaan dengan kain microfiber bersih jika terdapat kelebihan cairan untuk hasil warna hitam rata.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Pastikan permukaan plastik benar-benar kering sebelum aplikasi agar formula meresap optimal.',
        'Gunakan selotip kertas (masking tape) pada perbatasan cat glossy agar pigmen tidak meluber.',
        'Lakukan pelapisan kedua (layering) jika plastik sudah dalam kondisi memutih parah.'
      ],
      donts: [
        'JANGAN aplikasikan pada panel bodi mobil yang dilapisi cat glossy/clear coat.',
        'JANGAN cuci permukaan trim plastik yang baru diolesi dalam kurun waktu 24 jam pertama.',
        'JANGAN gunakan di atas mika lampu headlamp atau kaca mobil.'
      ]
    },
    toolsRecommended: [
      'Busa Aplikator Padat (Detailing Sponge Pad)',
      'Kain Microfiber Lap Sisa Residu',
      'Selotip Kertas Masking Tape'
    ],
    sequenceStep: 2,
    sequencePhase: 'Restorasi & Perawatan Luar',
    sequenceRole: 'Menghitamkan kembali bagian trim plastik dan karet yang pudar akibat cuaca.',
    imagePlaceholder: 'Action Black Dressing — 500 ml'
  },
  {
    id: '04',
    slug: 'tire-shine-protection',
    name: 'Tire Shine Protection',
    category: 'Perawatan Ban',
    categoryKey: 'trim-tire',
    volume: '1 Liter',
    image: '/images/tire-shine-protection.jpg',
    highlightBadge: 'Ultimate Wet-Look 1L',
    solvesProblem: 'Dinding ban cokelat, kusam & kering getas',
    summary: 'Kilap gloss wet-look pekat berkualitas tinggi dengan perlindungan elastisitas ban dari cuaca ekstrem.',
    description: 'ATVIA Tire Shine Protection hadir dalam kemasan jumbo ekonomis 1 Liter dengan formula silikon polimer pekat untuk menghasilkan kilap basah (glossy wet-look) hitam pekat yang elegan pada dinding samping ban. Diperkaya kondisioner khusus yang merawat elastisitas karet, mencegah retak rambut (dry rot), serta formula sling-free yang tidak menyiprat ke panel pintu saat mobil dipacu kencang.',
    benefits: [
      'Ultimate Shine & Protection: kilap wet-look pekat tahan lama yang menonjolkan profil roda',
      'Anti-Cracking Matrix: merawat kelenturan karet ban dari panas aspal dan radiasi sinar UV',
      'Sling-Free Formula dalam kemasan 1 Liter pekat yang irit pemakaian dan cepat mengering'
    ],
    specs: {
      formula: 'Concentrated Silicone Polymer & Anti-Ozone Anti-Crack Agent',
      ph: 'Netral',
      compatibleSurfaces: 'Dinding samping ban kendaraan (sidewall ban mobil, motor, truk ringan)',
      finish: 'Deep High-Gloss Wet-Look & Water-Repellent Shield',
      curingTime: '10–15 Menit Pengeringan (Formula No-Sling Bebas Cipratan)',
      yield: 'Kemasan Jumbo 1 Liter — Hingga 100+ Aplikasi Ban Mobil',
      durability: 'Bertahan 2–3 Minggu di Kondisi Hujan dan Panas Aspal'
    },
    applicationSteps: [
      {
        step: 1,
        title: 'Cuci & Sikat Ban',
        instruction: 'Sikat dinding ban dengan sabun dan air untuk mengangkat kotoran lumpur, debu rem (brake dust), dan sisa semir lama.'
      },
      {
        step: 2,
        title: 'Keringkan Dinding Ban',
        instruction: 'Pastikan dinding samping ban benar-benar kering agar formula silikon polimer dapat mengikat pori karet secara maksimal.'
      },
      {
        step: 3,
        title: 'Tuangkan ke Aplikator Ban',
        instruction: 'Tuang secukupnya Tire Shine Protection pada busa aplikator khusus ban (tire pad) atau kuas ban berbulu halus.'
      },
      {
        step: 4,
        title: 'Oleskan Memutar Merata',
        instruction: 'Ratakan ke seluruh dinding samping ban mengikuti alur lingkaran roda tanpa menyentuh tapak yang bersentuhan dengan jalan.'
      },
      {
        step: 5,
        title: 'Waktu Pengikatan Karet',
        instruction: 'Diamkan 10–15 menit sebelum kendaraan dijalankan agar cairan meresap sempurna dan tidak menyiprat ke bodi mobil.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Gunakan aplikator busa melengkung (curved tire pad) agar sesuai dengan kontur ban mobil.',
        'Bersihkan debu rem dan minyak pada ban terlebih dahulu untuk kilau maksimal.',
        'Tutup rapat kemasan 1 Liter setelah digunakan dan simpan pada posisi tegak di area teduh.'
      ],
      donts: [
        'JANGAN oleskan pada telapak tapak ban yang menapak ke aspal atau ke piringan rem (cakram/tromol).',
        'JANGAN gunakan pada ban motor di bagian tapak miring yang digunakan untuk bermanuver menikung.',
        'JANGAN memacu kendaraan pada kecepatan tinggi seketika setelah aplikasi sebelum ban kering.'
      ]
    },
    toolsRecommended: [
      'Spons Busa Melengkung (Curved Tire Applicator Pad)',
      'Kuas Ban Detailing Halus',
      'Sikat Ban Pembersih Kontaminan'
    ],
    sequenceStep: 2,
    sequencePhase: 'Perawatan Ban & Roda',
    sequenceRole: 'Memberikan kilap pekat dan perlindungan karet ban agar selalu elastis dan terawat.',
    imagePlaceholder: 'Tire Shine Protection — 1 Liter'
  },
  {
    id: '05',
    slug: 'advance-coating',
    name: 'Advance Coating',
    category: 'Proteksi Cat & Kilap',
    categoryKey: 'paint',
    volume: '500 ml',
    image: '/images/advance-coating.jpg',
    highlightBadge: 'Hydrophobic Beading',
    solvesProblem: 'Cat kusam & air mudah mengendap noda',
    summary: 'Formula spray coating cepat menghasilkan kilau reflektif tinggi, efek hidrofobik daun talas, dan proteksi cat.',
    description: 'ATVIA Advance Coating dengan prinsip Shine, Protect, Easy Application dirancang dengan teknologi liquid nano-sealant SiO2 untuk memberikan kilap pantulan cermin (deep mirror gloss) serta proteksi hidrofobik daun talas yang instan. Mengurangi adhesi debu jalanan, mempercepat proses pengeringan saat mencuci mobil, serta mencegah air hujan asam mengendap menjadi noda waterspot baru.',
    benefits: [
      'Efek hidrofobik daun talas (lotus effect) kuat yang membuat tetesan air meluncur jatuh secara instan',
      'Kilap reflektif tinggi (Deep Mirror Gloss) yang mempertegas kedalaman warna asli cat kendaraan',
      'Aplikasi semprot cepat (Easy Spray & Buff) tanpa memerlukan mesin poles, cukup 2 lap microfiber'
    ],
    specs: {
      formula: 'Liquid SiO2 Hydrophobic Nano-Sealant & Gloss Enhancer',
      ph: 'pH 6.8–7.0 (Netral Sangat Aman untuk Semua Jenis Pernis Mobil)',
      compatibleSurfaces: 'Cat bodi glossy mobil & motor, velg alloy, lampu mika akrilik, kaca luar',
      finish: 'Deep Mirror Reflection & Ultra-Slick Lotus Hydrophobic Beading',
      curingTime: 'Curing instan 2 jam, Ikatan polimer maksimal 12 jam bebas hujan lebat',
      yield: '12–18 Unit Mobil Penuh (Sangat Irit Pemakaian)',
      durability: 'Efek hidrofobik aktif hingga 4–6 Minggu per aplikasi'
    },
    applicationSteps: [
      {
        step: 1,
        title: 'Pencucian & Pengeringan Bodi',
        instruction: 'Cuci kendaraan hingga bersih dari debu dan residu minyak. Pastikan bodi kendaraan dingin dan terlindung dari sinar matahari langsung.'
      },
      {
        step: 2,
        title: 'Pengerjaan Panel per Panel',
        instruction: 'Kerjakan secara bertahap panel per panel (misal: setengah kap mesin, lalu pintu samping, dilanjutkan fender).'
      },
      {
        step: 3,
        title: 'Semprot Halus & Ringan',
        instruction: 'Semprotkan 2–3 semprotan kabut Advance Coating ke panel bodi atau langsung ke permukaan kain microfiber pertama.'
      },
      {
        step: 4,
        title: 'Ratakan Searah',
        instruction: 'Ratakan cairan dengan gerakan vertikal dan horizontal menggunakan kain microfiber pertama hingga tipis merata.'
      },
      {
        step: 5,
        title: 'Buffing Kilap Sempurna',
        instruction: 'Segera gunakan kain microfiber kedua yang kering dan bersih untuk buffing lembut hingga kilau cermin reflektif dan licin muncul.'
      }
    ],
    dosAndDonts: {
      dos: [
        'Gunakan selalu 2 kain microfiber berbeda: satu untuk meratakan cairan, satu khusus untuk buffing kilap.',
        'Aplikasikan rutin setiap selesai cuci mobil mingguan untuk mempertahankan lapisan hidrofobik.',
        'Sangat efektif diaplikasikan pada mika lampu depan untuk menjaga kejernihan dari kusam.'
      ],
      donts: [
        'JANGAN aplikasikan di bawah terik matahari langsung atau saat permukaan bodi sedang panas.',
        'JANGAN gunakan kain microfiber yang kotor atau kasar karena dapat menimbulkan baret halus.',
        'JANGAN biarkan cairan mengering sendiri di bodi mobil tanpa proses buffing kain kering.'
      ]
    },
    toolsRecommended: [
      '2x Kain Microfiber Tebal Edgeless (Min. 400–500 GSM)',
      'Lampu Inspeksi Pencahayaan Detailing',
      'Botol Spray Cadangan (Opsional)'
    ],
    sequenceStep: 3,
    sequencePhase: 'Proteksi Cat & Coating',
    sequenceRole: 'Lapisan perlindungan cat akhir untuk mengunci kilap dan memberikan efek tolak air.',
    imagePlaceholder: 'Advance Coating — 500 ml'
  }
];

export const careSequence = [
  {
    step: '1',
    name: 'Bersihkan & Dekontaminasi',
    cardTitle: 'Bersihkan & Dekontaminasi',
    description: 'Melarutkan noda air membandel, jamur kaca, dan deposit mineral untuk menghasilkan permukaan yang bersih murni sebelum tahap proteksi.',
    products: ['Waterspot Cleaner'],
    activeZone: 'Kaca & Panel Eksterior',
    purpose: 'Dasar pembersihan noda mineral tanpa menggores atau meninggalkan residu',
    proTip: 'Aplikasikan saat permukaan kaca dingin dan berada di area teduh. Usap searah dengan kain microfiber, lalu langsung bilas air bersih dan keringkan segera.',
    tools: 'Kain microfiber bersih & semprotan air bilas'
  },
  {
    step: '2',
    name: 'Restorasi & Perawatan Luar',
    cardTitle: 'Restorasi & Perawatan Luar',
    description: 'Mengembalikan kehitaman trim plastik bodi yang pudar serta memberikan kilau basah dan perlindungan elastisitas pada ban.',
    products: ['Action Black Dressing', 'Tire Shine Protection'],
    activeZone: 'Trim Plastik, Karet & Dinding Ban',
    purpose: 'Merestorasi pigmen hitam plastik/karet kusam sekaligus menjaga kelenturan dinding ban dari retak cuaca',
    proTip: 'Pastikan permukaan plastik dan ban bebas lumpur serta kering sempurna. Tuangkan cairan pada aplikator busa, ratakan secara tipis, dan biarkan meresap 5–10 menit.',
    tools: 'Spons aplikator busa lembut & kuas detailing untuk sela grill/emblem'
  },
  {
    step: '3',
    name: 'Proteksi Cat & Coating',
    cardTitle: 'Proteksi Cat & Coating',
    description: 'Melapisi cat eksterior dengan efek hidrofobik daun talas yang kuat serta kilau reflektif yang melindungi dari cuaca.',
    products: ['Advance Coating'],
    activeZone: 'Permukaan Cat Bodi Eksterior',
    purpose: 'Mengunci kilau reflektif cat bodi dan membentuk lapisan pelindung air (efek daun talas) serta anti-kotoran',
    proTip: 'Kerjakan per satu panel bodi di tempat teduh. Semprotkan tipis secara merata, ratakan dengan kain microfiber pertama, lalu seka bersih (buffing) dengan kain microfiber kedua yang kering.',
    tools: '2 helai kain microfiber bersih (1 untuk ratakan formula, 1 untuk buffing kilap akhir)'
  },
  {
    step: '4',
    name: 'Finishing & Kesegaran Interior',
    cardTitle: 'Finishing & Kesegaran Interior',
    description: 'Membersihkan dasbor, konsol, dan jok kabin dari debu sekaligus mengunci aroma kesegaran mewah yang tahan lama.',
    products: ['Interior Guard'],
    activeZone: 'Kabin Interior (Dasbor, Doortrim, Konsol & Jok PU/PVC)',
    purpose: 'Membersihkan debu statis dan minyak kabin dengan hasil akhir Natural Satin Touch (tidak silau di kaca) serta proteksi UV',
    proTip: 'Semprotkan cairan ke lap microfiber terlebih dahulu agar embun tidak mengenai kaca depan bagian dalam. Hindari penyemprotan pada pedal gas/rem, lingkar kemudi, dan bahan suede asli.',
    tools: 'Kain Microfiber Khusus Interior (Short-pile 300 GSM), Kuas Boar Hair & Spons Aplikator Lembut'
  }
];

export const faqItems = [
  {
    id: 'faq-1',
    question: 'Apakah Waterspot Cleaner aman untuk kaca eksterior dan panel cat mobil?',
    answer: 'Ya, Waterspot Cleaner diformulasikan khusus dengan zat aktif pelarut mineral yang aman untuk kaca samping, kaca belakang, maupun panel bodi di sekitar emblem, asalkan diaplikasikan sesuai petunjuk (pada permukaan dingin, tidak di bawah terik matahari, dan dibilas bersih).'
  },
  {
    id: 'faq-2',
    question: 'Berapa lama daya tahan kilap dan efek hidrofobik dari Advance Coating?',
    answer: 'Efek hidrofobik daun talas dan proteksi kilap Advance Coating bertahan antara 2 hingga 4 minggu dalam kondisi pemakaian harian di iklim tropis Indonesia. Untuk perlindungan maksimal yang konsisten, aplikasikan tipis secara berkala setiap kali selesai mencuci kendaraan.'
  },
  {
    id: 'faq-3',
    question: 'Apakah Action Black Dressing akan luntur atau belang saat kendaraan terkena hujan?',
    answer: 'Tidak. Formula Back to Black meresap ke dalam pori-pori plastik dan karet, mengikat pigmen warna setelah dibiarkan mengering selama 15–20 menit. Hasilnya tidak berminyak, debu tidak mudah menempel, dan tahan bilasan air hujan biasa.'
  },
  {
    id: 'faq-4',
    question: 'Apakah Tire Shine Protection membuat ban licin dan berbahaya untuk dikendarai?',
    answer: 'Tidak. Produk ini khusus diaplikasikan pada dinding samping ban (sidewall), bukan pada tapak ban yang bersentuhan langsung dengan aspal. Dinding ban tetap elastis, terlindungi dari retak rambut akibat panas, dan keselamatan berkendara tetap terjamin.'
  },
  {
    id: 'faq-5',
    question: 'Apakah ATVIA melayani pemesanan khusus untuk bengkel, salon detailing, atau reseller?',
    answer: 'Tentu. Kami menyediakan program kemitraan resmi untuk bengkel car wash, salon detailing profesional, serta agen reseller di seluruh Indonesia dengan penawaran paket khusus. Anda dapat langsung berkonsultasi mengenai kuantiti dan pengiriman dengan admin kami via WhatsApp.'
  }
];
