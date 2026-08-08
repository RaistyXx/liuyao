const SUPABASE_URL = 'https://cqvjwvasdpyaxpdareog.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vITIrKzP34JFAifsiUXHvg_b3sOb2-A';
const HEADERS = { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' };

// ====== 六十四卦数据 ======
const TRIGRAMS = {
  0b111:{name:'乾',symbol:'☰',nature:'天'},
  0b000:{name:'坤',symbol:'☷',nature:'地'},
  0b001:{name:'震',symbol:'☳',nature:'雷'},
  0b010:{name:'坎',symbol:'☵',nature:'水'},
  0b100:{name:'艮',symbol:'☶',nature:'山'},
  0b110:{name:'巽',symbol:'☴',nature:'风'},
  0b101:{name:'离',symbol:'☲',nature:'火'},
  0b011:{name:'兑',symbol:'☱',nature:'泽'},
};

const HEXAGRAMS = {
0b000000:{name:'坤为地',pinyin:'Kūn',judgment:'元亨，利牝马之贞。君子有攸往，先迷后得主，利。西南得朋，东北丧朋。安贞吉。',image:'地势坤，君子以厚德载物。',interpret:'此卦六爻皆阴，象征大地之德。柔顺而能承载万物，以柔克刚。宜守不宜攻，以柔顺之道处之，静待时机。',lines:['初六：履霜，坚冰至。','六二：直方大，不习无不利。','六三：含章可贞，或从王事，无成有终。','六四：括囊，无咎无誉。','六五：黄裳，元吉。','上六：龙战于野，其血玄黄。']},
0b000001:{name:'地雷复',pinyin:'Fù',judgment:'亨。出入无疾，朋来无咎。反复其道，七日来复。利有攸往。',image:'雷在地中，复。',interpret:'一阳初生，万物复苏之象。事情在经历低谷后开始好转，宜顺势而为。',lines:['初九：不远复，无祗悔，元吉。','六二：休复，吉。','六三：频复，厉，无咎。','六四：中行独复。','六五：敦复，无悔。','上六：迷复，凶，有灾眚。']},
0b000010:{name:'地水师',pinyin:'Shī',judgment:'贞，丈人吉，无咎。',image:'地中有水，师。君子以容民畜众。',interpret:'师者，众也，军队之象。象征集结力量、组织团队。需有德高望重者统领。',lines:['初六：师出以律，否臧凶。','九二：在师中，吉无咎，王三锡命。','六三：师或舆尸，凶。','六四：师左次，无咎。','六五：田有禽，利执言，无咎。','上六：大君有命，开国承家，小人勿用。']},
0b000011:{name:'地泽临',pinyin:'Lín',judgment:'元亨利贞。至于八月有凶。',image:'泽上有地，临。君子以教思无穷，容保民无疆。',interpret:'地临泽上，居高临下之象。事业上有机会上位或承担领导责任。需注意半年后可能出现变数。',lines:['初九：咸临，贞吉。','九二：咸临，吉无不利。','六三：甘临，无攸利。','六四：至临，无咎。','六五：知临，大君之宜，吉。','上六：敦临，吉无咎。']},
0b000100:{name:'地山谦',pinyin:'Qiān',judgment:'亨，君子有终。',image:'地中有山，谦。君子以裒多益寡，称物平施。',interpret:'六十四卦中唯一全吉之卦。谦虚使人受益，行亗低调不张扬，反而能获得认可与成功。',lines:['初六：谦谦君子，用涉大川，吉。','六二：鸣谦，贞吉。','九三：劳谦君子，有终吉。','六四：无不利，撝谦。','六五：不富以其邻，利用侵伐。','上六：鸣谦，利用行师，征邑国。']},
0b000101:{name:'地火明夷',pinyin:'Míng Yí',judgment:'利艰贞。',image:'明入地中，明夷。君子以莅众，用晦而明。',interpret:'光明沉入地下，昏暗之象。宜韬光养晦，保存实力，等待时机。',lines:['初九：明夷于飞，垂其翼。','六二：明夷，夷于左股，用拯马壮，吉。','九三：明夷于南狩，得其大首。','六四：入于左腹，获明夷之心。','六五：箕子之明夷，利贞。','上六：不明晦，初登于天，后入于地。']},
0b000110:{name:'地风升',pinyin:'Shēng',judgment:'元亨，用见大人，勿恤，南征吉。',image:'地中生木，升。君子以顺德，积小以高大。',interpret:'步步上升之象。象征事业上升、职位晋升。宜顺势向上发展，循序渐进。',lines:['初六：允升，大吉。','九二：孚乃利用禴，无咎。','九三：升虚邑。','六四：王用亨于岐山，吉无咎。','六五：贞吉，升阶。','上六：冥升，利于不息之贞。']},
0b000111:{name:'地天泰',pinyin:'Tài',judgment:'小往大来，吉亨。',image:'天地交，泰。后以财成天地之道。',interpret:'天地相交，阴阳和谐，万物通泰之象。最吉利的卦之一。宜积极行动，把握良机。',lines:['初九：拔茅茹，以其汇，征吉。','九二：包荒，用冯河，不遐遗。','九三：无平不陂，无往不复。','六四：翩翩不富，以其邻。','六五：帝乙归妹，以祉元吉。','上六：城复于隍，勿用师。']},
0b001000:{name:'雷地豫',pinyin:'Yù',judgment:'利建侯行师。',image:'雷出地奋，豫。先王以作乐崇德。',interpret:'雷声出地，振奋人心，愉悦之象。宜在愉悦中谋划大事。但不可过度享乐。',lines:['初六：鸣豫，凶。','六二：介于石，不终日，贞吉。','六三：盱豫，悔。','九四：由豫，大有得。','六五：贞疾，恒不死。','上六：冥豫，成有渝，无咎。']},
0b001001:{name:'震为雷',pinyin:'Zhèn',judgment:'亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。',image:'洊雷，震。君子以恐惧修省。',interpret:'震动之象。突然的变故令人惊惧，但能令人反省修身。临危不乱，处变不惊。',lines:['初九：震来虩虩，后笑言哑哑。','六二：震来厉，亿丧贝。','六三：震苏苏，震行无眚。','九四：震遂泥。','六五：震往来厉，亿无丧。','上六：震索索，视矍矍。']},
0b001010:{name:'雷水解',pinyin:'Xiè',judgment:'利西南，无所往，其来复吉。有攸往，夙吉。',image:'雷雨作，解。君子以赦过宥罪。',interpret:'雷雨交加，万物解困之象。象征困难解除、问题得到解决。宜宽恕他人，放下过去。',lines:['初六：无咎。','九二：田获三狐，得黄矢，贞吉。','六三：负且乘，致寇至。','九四：解而拇，朋至斯孚。','六五：君子维有解，吉。','上六：公用射隼于高墉之上。']},
0b001011:{name:'雷泽归妹',pinyin:'Guī Mèi',judgment:'征凶，无攸利。',image:'泽上有雷，归妹。君子以永终知敝。',interpret:'少女出嫁之象。象征结合、归宿，但也暗含不当的结合。宜谨慎处理合作与感情关系。',lines:['初九：归妹以娣，跛能履，征吉。','九二：眇能视，利幽人之贞。','六三：归妹以须，反归以娣。','九四：归妹愆期，迟归有时。','六五：帝乙归妹，其君之袂。','上六：女承筐无实，士刲羊无血。']},
0b001100:{name:'雷山小过',pinyin:'Xiǎo Guò',judgment:'亨，利贞。可小事，不可大事。',image:'山上有雷，小过。君子以行过乎恭。',interpret:'稍有过度之象。宜处理小事，不宜担当大任。在细节上多下功夫。',lines:['初六：飞鸟以凶。','六二：过其祖，遇其妣。','九三：弗过防之，从或戕之。','九四：无咎，弗过遇之。','六五：密云不雨，自我西郊。','上六：弗遇过之，飞鸟离之。']},
0b001101:{name:'雷火丰',pinyin:'Fēng',judgment:'亨，王假之，勿忧，宜日中。',image:'雷电皆至，丰。君子以折狱致刑。',interpret:'盛大光明之象。象征丰盛、富足。但盛极必衰，需有忧患意识，保持中和。',lines:['初九：遇其配主，虽旬无咎。','六二：丰其蔀，日中见斗。','九三：丰其沛，日中见沬。','九四：丰其蔀，日中见斗。','六五：来章，有庆誉，吉。','上六：丰其屋，蔀其家。']},
0b001110:{name:'雷风恒',pinyin:'Héng',judgment:'亨，无咎，利贞，利有攸往。',image:'雷风恒，君子以立不易方。',interpret:'恒久不变之象。象征持久、稳定、婚姻长久。感情方面最吉的卦之一。',lines:['初六：浚恒，贞凶，无攸利。','九二：悔亡。','九三：不恒其德，或承之羞。','六四：田无禽。','六五：恒其德，贞。','上六：振恒，凶。']},
0b001111:{name:'雷天大壮',pinyin:'Dà Zhuàng',judgment:'利贞。',image:'雷在天上，大壮。君子以非礼弗履。',interpret:'声势壮大之象。象征强盛、壮大。但强大之时更需谨慎，不可恃强凌弱。',lines:['初九：壮于趾，征凶，有孚。','九二：贞吉。','九三：小人用壮，君子用罔。','九四：贞吉悔亡，藩决不赢。','六五：丧羊于易，无悔。','上六：羝羊触藩，不能退，不能遂。']},
0b010000:{name:'水地比',pinyin:'Bǐ',judgment:'吉。原筮，元永贞，无咎。不宁方来，后夫凶。',image:'地上有水，比。先王以建万国，亲诸侯。',interpret:'亲密无间之象。象征亲附、团结、合作。宜与人合作，亲近贤德之人。',lines:['初六：有孚比之，无咎。','六二：比之自内，贞吉。','六三：比之匪人。','六四：外比之，贞吉。','九五：显比，王用三驱。','上六：比之无首，凶。']},
0b010001:{name:'水雷屯',pinyin:'Zhūn',judgment:'元亨利贞，勿用有攸往，利建侯。',image:'云雷屯，君子以经纶。',interpret:'万物初生艰难之象。万事开头难，宜稳扎稳打，不宜冒进。耐心经营终能破茧而出。',lines:['初九：磐桓，利居贞，利建侯。','六二：屯如邅如，乘马班如。','六三：即鹿无虞，惟入于林中。','六四：乘马班如，求婚媾。','九五：屯其膏，小贞吉，大贞凶。','上六：乘马班如，泣血涟如。']},
0b010010:{name:'坎为水',pinyin:'Kǎn',judgment:'习坎，有孚，维心亨，行有尚。',image:'水洊至，习坎。君子以常德行，习教事。',interpret:'险陷重重之象。危险、困难重重。但险中亦有生机，保持诚信与内心通达可化险为夷。',lines:['初六：习坎，入于坎窞，凶。','九二：坎有险，求小得。','六三：来之坎坎，险且枕。','六四：樽酒簋贰，用缶。','九五：坎不盈，祗既平，无咎。','上六：系用徽纆，寘于丛棘。']},
0b010011:{name:'水泽节',pinyin:'Jié',judgment:'亨。苦节不可贞。',image:'泽上有水，节。君子以制数度，议德行。',interpret:'节制之象。凡事有度，过犹不及。合理的节制是美德，过分的节制则不可取。',lines:['初九：不出户庭，无咎。','九二：不出门庭，凶。','六三：不节若，则嗟若。','六四：安节，亨。','九五：甘节，吉。','上六：苦节，贞凶。']},
0b010100:{name:'水山蹇',pinyin:'Jiǎn',judgment:'利西南，不利东北。利见大人，贞吉。',image:'山上有水，蹇。君子以反身修德。',interpret:'行路艰难之象。不宜硬闯，宜反躬自省，修养德行，等待时机。',lines:['初六：往蹇，来誉。','六二：王臣蹇蹇，匪躬之故。','九三：往蹇来反。','六四：往蹇来连。','九五：大蹇朋来。','上六：往蹇来硕，吉。']},
0b010101:{name:'水火既济',pinyin:'Jì Jì',judgment:'亨小，利贞。初吉终乱。',image:'水在火上，既济。君子以思患而预防之。',interpret:'事已成功之象。象征成功、圆满。但初吉终乱，成功后不可松懈，需居安思危。',lines:['初九：曳其轮，濡其尾，无咎。','六二：妇丧其茀，勿逐，七日得。','九三：高宗伐鬼方，三年克之。','六四：繻有衣袽，终日戒。','九五：东邻杀牛，不如西邻之禴祭。','上六：濡其首，厉。']},
0b010110:{name:'水风井',pinyin:'Jǐng',judgment:'改邑不改井，无丧无得，往来井井。',image:'木上有水，井。君子以劳民劝相。',interpret:'井水养人，取之不竭。象征资源、供养、不变的价值。宜养护根本，保持内心清净。',lines:['初六：井泥不食，旧井无禽。','九二：井谷射鲋，瓮敝漏。','九三：井渫不食，为我心恻。','六四：井甃，无咎。','九五：井洌，寒泉食。','上六：井收勿幕，有孚元吉。']},
0b010111:{name:'水天需',pinyin:'Xū',judgment:'有孚，光亨，贞吉。利涉大川。',image:'云上于天，需。君子以饮食宴乐。',interpret:'等待之象。时机未到不可强求，保持诚信与乐观，在等待中充实自己。',lines:['初九：需于郊，利用恒，无咎。','九二：需于沙，小有言，终吉。','九三：需于泥，致寇至。','六四：需于血，出自穴。','九五：需于酒食，贞吉。','上六：入于穴，有不速之客三人来。']},
0b011000:{name:'泽地萃',pinyin:'Cuì',judgment:'亨。王假有庙，利见大人，亨，利贞。',image:'泽上于地，萃。君子以除戎器，戒不虞。',interpret:'荟萃之象。象征聚集、汇聚、人才荟萃。精英聚集力量强大，但需戒备意外之事。',lines:['初六：有孚不终，乃乱乃萃。','六二：引吉，无咎。','六三：萃如嗟如，无攸利。','九四：大吉，无咎。','九五：萃有位，无咎。','上六：赍咨涕洟，无咎。']},
0b011001:{name:'泽雷随',pinyin:'Suí',judgment:'元亨利贞，无咎。',image:'泽中有雷，随。君子以向晦入宴息。',interpret:'随顺之象。顺应时势，不固执己见。随机应变，柔顺处世。',lines:['初九：官有渝，贞吉。','六二：系小子，失丈夫。','六三：系丈夫，失小子。','九四：随有获，贞凶。','九五：孚于嘉，吉。','上六：拘系之，乃从维之。']},
0b011010:{name:'泽水困',pinyin:'Kùn',judgment:'亨，贞，大人吉，无咎。有言不信。',image:'泽无水，困。君子以致命遂志。',interpret:'困顿之象。身处困境之时言语不被人信任。但坚守正道终能脱困。',lines:['初六：臀困于株木，入于幽谷。','九二：困于酒食，朱绂方来。','六三：困于石，据于蒺藜。','九四：来徐徐，困于金车。','九五：劓刖，困于赤绂。','上六：困于葛藟，于臲兀。']},
0b011011:{name:'兑为泽',pinyin:'Duì',judgment:'亨，利贞。',image:'丽泽，兑。君子以朋友讲习。',interpret:'喜悦之象。朋友相聚讲习、互相切磋。以和悦之心待人接物，善于沟通表达。',lines:['初九：和兑，吉。','九二：孚兑，吉，悔亡。','六三：来兑，凶。','九四：商兑，未宁。','九五：孚于剥，有厉。','上六：引兑。']},
0b011100:{name:'泽山咸',pinyin:'Xián',judgment:'亨，利贞，取女吉。',image:'山上有泽，咸。君子以虚受人。',interpret:'感应之象。象征感情、婚姻。至诚感应可沟通天地万物，感情婚姻大吉。',lines:['初六：咸其拇。','六二：咸其腓，凶。','九三：咸其股，执其随。','九四：贞吉悔亡，憧憧往来。','九五：咸其脢，无悔。','上六：咸其辅颊舌。']},
0b011101:{name:'泽火革',pinyin:'Gé',judgment:'己日乃孚，元亨利贞，悔亡。',image:'泽中有火，革。君子以治历明时。',interpret:'变革之象。旧秩序被打破新秩序建立。时机成熟后推行改革，取信于民。',lines:['初九：巩用黄牛之革。','六二：己日乃革之。','九三：征凶，贞厉。','九四：悔亡，有孚改命。','九五：大人虎变，未占有孚。','上六：君子豹变，小人革面。']},
0b011110:{name:'泽风大过',pinyin:'Dà Guò',judgment:'栋桡，利有攸往，亨。',image:'泽灭木，大过。君子以独立不惧。',interpret:'大为过甚之象。非常之时需要非常之人。宜独立不惧，勇于承担。',lines:['初六：藉用白茅，无咎。','九二：枯杨生稊，老夫得其女妻。','九三：栋桡，凶。','九四：栋隆，吉。','九五：枯杨生华，老妇得其士夫。','上六：过涉灭顶，凶，无咎。']},
0b011111:{name:'泽天夬',pinyin:'Guài',judgment:'扬于王庭，孚号有厉。告自邑，不利即戎。',image:'泽上于天，夬。君子以施禄及下。',interpret:'决断之象。五阳决一阴，君子道长。处事需果断，但不可用武力。',lines:['初九：壮于前趾，往不胜。','九二：惕号，莫夜有戎。','九三：壮于頄，有凶。','九四：臀无肤，其行次且。','九五：苋陆夬夬，中行无咎。','上六：无号，终有凶。']},
0b100000:{name:'山地剥',pinyin:'Bō',judgment:'不利有攸往。',image:'山附于地，剥。上以厚下安宅。',interpret:'层层剥落之象。小人当道、君子困顿。宜稳固根基，静待阴霾散去。',lines:['初六：剥床以足，蔑贞凶。','六二：剥床以辨，蔑贞凶。','六三：剥之，无咎。','六四：剥床以肤，凶。','六五：贯鱼，以宫人宠，无不利。','上九：硕果不食，君子得舆。']},
0b100001:{name:'山雷颐',pinyin:'Yí',judgment:'贞吉。观颐，自求口实。',image:'山下有雷，颐。君子以慎言语，节饮食。',interpret:'颐养之象。需谨慎言语，节制饮食。靠自己努力获取滋养。',lines:['初九：舍尔灵龟，观我朵颐，凶。','六二：颠颐，拂经。','六三：拂颐，贞凶。','六四：颠颐，吉。','六五：拂经，居贞吉。','上九：由颐，厉吉，利涉大川。']},
0b100010:{name:'山水蒙',pinyin:'Méng',judgment:'亨。匪我求童蒙，童蒙求我。',image:'山下出泉，蒙。君子以果行育德。',interpret:'蒙昧初开之象。象征学习、教育。教育之道在于启发而非灌输。',lines:['初六：发蒙，利用刑人。','九二：包蒙，吉。','六三：勿用取女，见金夫。','六四：困蒙，吝。','六五：童蒙，吉。','上九：击蒙，不利为寇，利御寇。']},
0b100011:{name:'山泽损',pinyin:'Sǔn',judgment:'有孚，元吉，无咎，可贞，利有攸往。',image:'山下有泽，损。君子以惩忿窒欲。',interpret:'减损之象。付出与牺牲有时反而能获得更大收益。宜克制愤怒抑制欲望。',lines:['初九：已事遄往，无咎。','九二：利贞，征凶，弗损益之。','六三：三人行，则损一人。','六四：损其疾，使遄有喜。','六五：或益之十朋之龟。','上九：弗损益之，无咎。']},
0b100100:{name:'艮为山',pinyin:'Gèn',judgment:'艮其背，不获其身。行其庭，不见其人。无咎。',image:'兼山，艮。君子以思不出其位。',interpret:'静止不动之象。当行则行，当止则止。思虑不超出自己的位置，安守本分。',lines:['初六：艮其趾，无咎。','六二：艮其腓，不拯其随。','九三：艮其限，列其夤。','六四：艮其身，无咎。','六五：艮其辅，言有序。','上九：敦艮，吉。']},
0b100101:{name:'山火贲',pinyin:'Bì',judgment:'亨。小利有攸往。',image:'山下有火，贲。君子以明庶政，无敢折狱。',interpret:'文饰之象。适当的装饰可以增添光彩，但不宜过度追求外表，本质更重要。',lines:['初九：贲其趾，舍车而徒。','六二：贲其须。','九三：贲如濡如，永贞吉。','六四：贲如皤如，白马翰如。','六五：贲于丘园，束帛戋戋。','上九：白贲，无咎。']},
0b100110:{name:'山风蛊',pinyin:'Gǔ',judgment:'元亨，利涉大川。先甲三日，后甲三日。',image:'山下有风，蛊。君子以振民育德。',interpret:'万物败坏后重生之象。发现问题后勇于改革，则能迎来新生。',lines:['初六：干父之蛊，有子考。','九二：干母之蛊，不可贞。','九三：干父之蛊，小有悔。','六四：裕父之蛊，往见吝。','六五：干父之蛊，用誉。','上九：不事王侯，高尚其事。']},
0b100111:{name:'山天大畜',pinyin:'Dà Chù',judgment:'利贞，不家食吉，利涉大川。',image:'天在山中，大畜。君子以多识前言往行。',interpret:'积蓄广大之象。宜广泛学习前人智慧，积蓄力量，厚积薄发。',lines:['初九：有厉，利已。','九二：舆说輹。','九三：良马逐，利艰贞。','六四：童牛之牿，元吉。','六五：豮豕之牙，吉。','上九：何天之衢，亨。']},
0b101000:{name:'火地晋',pinyin:'Jìn',judgment:'康侯用锡马蕃庶，昼日三接。',image:'明出地上，晋。君子以自昭明德。',interpret:'晋升之象。如旭日东升，步步高升。宜彰显自己的光明德行，积极进取。',lines:['初六：晋如摧如，贞吉。','六二：晋如愁如，贞吉。','六三：众允，悔亡。','九四：晋如鼫鼠，贞厉。','六五：悔亡，失得勿恤。','上九：晋其角，维用伐邑。']},
0b101001:{name:'火雷噬嗑',pinyin:'Shì Kè',judgment:'亨，利用狱。',image:'雷电噬嗑，先王以明罚敕法。',interpret:'咬合、惩戒之象。宜果断处理问题，执法严明，消除障碍。',lines:['初九：屦校灭趾，无咎。','六二：噬肤灭鼻，无咎。','六三：噬腊肉，遇毒。','九四：噬干胏，得金矢。','六五：噬干肉，得黄金。','上九：何校灭耳，凶。']},
0b101010:{name:'火水未济',pinyin:'Wèi Jì',judgment:'亨，小狐汔济，濡其尾，无攸利。',image:'火在水上，未济。君子以慎辨物居方。',interpret:'事未成之象。事物尚在发展过程中，小狐渡河沾湿尾巴，功亏一篑。须审慎行事。',lines:['初六：濡其尾，吝。','九二：曳其轮，贞吉。','六三：未济，征凶。','九四：贞吉悔亡，震用伐鬼方。','六五：贞吉无悔，君子之光。','上九：有孚于饮酒，无咎。']},
0b101011:{name:'火泽睽',pinyin:'Kuí',judgment:'小事吉。',image:'上火下泽，睽。君子以同而异。',interpret:'相互背离之象。君子和而不同，可以求同存异。在差异中寻求和谐。',lines:['初九：悔亡，丧马勿逐。','九二：遇主于巷，无咎。','六三：见舆曳，其牛掣。','九四：睽孤，遇元夫。','六五：悔亡，厥宗噬肤。','上九：睽孤，见豕负涂。']},
0b101100:{name:'火山旅',pinyin:'Lǚ',judgment:'小亨，旅贞吉。',image:'山上有火，旅。君子以明慎用刑。',interpret:'旅居在外之象。人生如旅，需随遇而安，保持柔顺，谨慎行事。',lines:['初六：旅琐琐，斯其所取灾。','六二：旅即次，怀其资。','九三：旅焚其次，丧其童仆。','九四：旅于处，得其资斧。','六五：射雉一矢亡。','上九：鸟焚其巢，旅人先笑后号咷。']},
0b101101:{name:'离为火',pinyin:'Lí',judgment:'利贞，亨。畜牝牛，吉。',image:'明两作，离。大人以继明照于四方。',interpret:'光明照耀之象。象征光明、依附、文明。宜依附正道，传承文明。',lines:['初九：履错然，敬之无咎。','六二：黄离，元吉。','九三：日昃之离，不鼓缶而歌。','九四：突如其来如，焚如死如。','六五：出涕沱若，戚嗟若。','上九：王用出征，有嘉折首。']},
0b101110:{name:'火风鼎',pinyin:'Dǐng',judgment:'元吉，亨。',image:'木上有火，鼎。君子以正位凝命。',interpret:'鼎器烹调之象。象征权力、变革、建立新秩序。革故鼎新，端正位置，大吉。',lines:['初六：鼎颠趾，利出否。','九二：鼎有实，我仇有疾。','九三：鼎耳革，其行塞。','九四：鼎折足，覆公餗。','六五：鼎黄耳金铉，利贞。','上九：鼎玉铉，大吉。']},
0b101111:{name:'火天大有',pinyin:'Dà Yǒu',judgment:'元亨。',image:'火在天上，大有。君子以遏恶扬善。',interpret:'大丰收、大拥有之象。象征富有、丰收、事业成功。极为吉利。',lines:['初九：无交害，匪咎。','九二：大车以载，有攸往。','九三：公用亨于天子。','九四：匪其彭，无咎。','六五：厥孚交如，威如。','上九：自天佑之，吉无不利。']},
0b110000:{name:'风地观',pinyin:'Guān',judgment:'盥而不荐，有孚颙若。',image:'风行地上，观。先王以省方，观民设教。',interpret:'观察之象。宜多观察、多学习，培养洞察力。先观察清楚再行动。',lines:['初六：童观，小人无咎，君子吝。','六二：窥观，利女贞。','六三：观我生，进退。','六四：观国之光，利用宾于王。','九五：观我生，君子无咎。','上九：观其生，君子无咎。']},
0b110001:{name:'风雷益',pinyin:'Yì',judgment:'利有攸往，利涉大川。',image:'风雷益，君子以见善则迁，有过则改。',interpret:'互相增益之象。见善则学，有过则改。事业学业皆有增益，宜积极进取。',lines:['初九：利用为大作，元吉。','六二：或益之十朋之龟。','六三：益之用凶事，无咎。','六四：中行，告公从。','九五：有孚惠心，勿问元吉。','上九：莫益之，或击之。']},
0b110010:{name:'风水涣',pinyin:'Huàn',judgment:'亨。王假有庙，利涉大川，利贞。',image:'风行水上，涣。先王以享于帝立庙。',interpret:'涣散之象。离散中蕴含凝聚的契机。宜以诚信凝聚人心，化解矛盾。',lines:['初六：用拯马壮，吉。','九二：涣奔其机，悔亡。','六三：涣其躬，无悔。','六四：涣其群，元吉。','九五：涣汗其大号。','上九：涣其血，去逖出。']},
0b110011:{name:'风泽中孚',pinyin:'Zhōng Fú',judgment:'豚鱼吉，利涉大川，利贞。',image:'泽上有风，中孚。君子以议狱缓死。',interpret:'诚信感动之象。以至诚之心待人接物，诚信可感动天地万物。',lines:['初九：虞吉，有它不燕。','九二：鸣鹤在阴，其子和之。','六三：得敌，或鼓或罢。','六四：月几望，马匹亡。','九五：有孚挛如，无咎。','上九：翰音登于天，贞凶。']},
0b110100:{name:'风山渐',pinyin:'Jiàn',judgment:'女归吉，利贞。',image:'山上有木，渐。君子以居贤德善俗。',interpret:'逐渐生长之象。循序渐进、按部就班。事业需脚踏实地，不可急于求成。',lines:['初六：鸿渐于干，小子厉。','六二：鸿渐于磐，饮食衎衎。','九三：鸿渐于陆，夫征不复。','六四：鸿渐于木，或得其桷。','九五：鸿渐于陵，妇三岁不孕。','上九：鸿渐于逵，其羽可用为仪。']},
0b110101:{name:'风火家人',pinyin:'Jiā Rén',judgment:'利女贞。',image:'风自火出，家人。君子以言有物而行有恒。',interpret:'家人之象。宜处理好家庭关系，各尽其责。家道正则天下定。',lines:['初九：闲有家，悔亡。','六二：无攸遂，在中馈。','九三：家人嗃嗃，悔厉吉。','六四：富家，大吉。','九五：王假有家，勿恤吉。','上九：有孚威如，终吉。']},
0b110110:{name:'巽为风',pinyin:'Xùn',judgment:'小亨，利有攸往，利见大人。',image:'随风，巽。君子以申命行事。',interpret:'柔顺渗透之象。如风无孔不入，以柔克刚。宜以柔顺谦逊的方式行事。',lines:['初六：进退，利武人之贞。','九二：巽在床下，用史巫纷若。','九三：频巽，吝。','六四：悔亡，田获三品。','九五：贞吉悔亡，无不利。','上九：巽在床下，丧其资斧。']},
0b110111:{name:'风天小畜',pinyin:'Xiǎo Chù',judgment:'亨。密云不雨，自我西郊。',image:'风行天上，小畜。君子以懿文德。',interpret:'小规模积蓄之象。密云不雨，条件尚不成熟。宜修养文德，等待时机。',lines:['初九：复自道，何其咎，吉。','九二：牵复，吉。','九三：舆说辐，夫妻反目。','六四：有孚，血去惕出。','九五：有孚挛如，富以其邻。','上九：既雨既处，尚德载。']},
0b111000:{name:'天地否',pinyin:'Pǐ',judgment:'否之匪人，不利君子贞。大往小来。',image:'天地不交，否。君子以俭德辟难。',interpret:'闭塞不通之象。付出多收获少，韬光养晦，待时而动。',lines:['初六：拔茅茹，以其汇，贞吉。','六二：包承，小人吉，大人否。','六三：包羞。','九四：有命无咎，畴离祉。','九五：休否，大人吉。','上九：倾否，先否后喜。']},
0b111001:{name:'天雷无妄',pinyin:'Wú Wàng',judgment:'元亨利贞。其匪正有眚，不利有攸往。',image:'天下雷行，物与无妄。',interpret:'真实无妄之象。不可有非分之想，保持真诚，遵循自然规律。妄动则灾。',lines:['初九：无妄，往吉。','六二：不耕获，不菑畲。','六三：无妄之灾，或系之牛。','九四：可贞，无咎。','九五：无妄之疾，勿药有喜。','上九：无妄，行有眚。']},
0b111010:{name:'天水讼',pinyin:'Sòng',judgment:'有孚，窒惕，中吉，终凶。利见大人，不利涉大川。',image:'天与水违行，讼。君子以作事谋始。',interpret:'争讼之象。宜见好就收，中道而止。做事从开始就需谨慎谋划。',lines:['初六：不永所事，小有言，终吉。','九二：不克讼，归而逋。','六三：食旧德，贞厉。','九四：不克讼，复即命。','九五：讼，元吉。','上九：或锡之鞶带，终朝三褫之。']},
0b111011:{name:'天泽履',pinyin:'Lǚ',judgment:'履虎尾，不咥人，亨。',image:'上天下泽，履。君子以辨上下，定民志。',interpret:'践行之象。如踩虎尾而虎不咬人，需小心谨慎。行为端正，依礼而行。',lines:['初九：素履，往无咎。','九二：履道坦坦，幽人贞吉。','六三：眇能视，跛能履。','九四：履虎尾，愬愬终吉。','九五：夬履，贞厉。','上九：视履考祥，其旋元吉。']},
0b111100:{name:'天山遁',pinyin:'Dùn',judgment:'亨，小利贞。',image:'天下有山，遁。君子以远小人。',interpret:'退避之象。小人当道时，君子宜退避自保。暂时的退避是明智的等待。',lines:['初六：遁尾，厉。','六二：执之用黄牛之革。','九三：系遁，有疾厉。','九四：好遁，君子吉。','九五：嘉遁，贞吉。','上九：肥遁，无不利。']},
0b111101:{name:'天火同人',pinyin:'Tóng Rén',judgment:'同人于野，亨。利涉大川，利君子贞。',image:'天与火，同人。君子以类族辨物。',interpret:'志同道合之象。宜与志同道合者共谋大事，以公正之心待人。',lines:['初九：同人于门，无咎。','六二：同人于宗，吝。','九三：伏戎于莽，升其高陵。','九四：乘其墉，弗克攻。','九五：同人先号咷而后笑。','上九：同人于郊，无悔。']},
0b111110:{name:'天风姤',pinyin:'Gòu',judgment:'女壮，勿用取女。',image:'天下有风，姤。后以施命诰四方。',interpret:'遇合之象，不期而遇。但不宜与过于强势者结合。',lines:['初六：系于金柅，贞吉。','九二：包有鱼，无咎。','九三：臀无肤，其行次且。','九四：包无鱼，起凶。','九五：以杞包瓜，含章。','上九：姤其角，吝。']},
0b111111:{name:'乾为天',pinyin:'Qián',judgment:'元亨利贞。',image:'天行健，君子以自强不息。',interpret:'六爻皆阳，纯阳至健。元亨利贞四德圆满。宜积极进取，自强不息。把握时机，持之以恒。',lines:['初九：潜龙勿用。','九二：见龙在田，利见大人。','九三：君子终日乾乾，夕惕若厉。','九四：或跃在渊，无咎。','九五：飞龙在天，利见大人。','上九：亢龙有悔。']},
};

// Fix hexagram keys
(function(){
  const remapBits=b=>{if(b===0b011)return 0b100;if(b===0b100)return 0b110;if(b===0b110)return 0b011;return b};
  const remapped={};
  for(const[k,d]of Object.entries(HEXAGRAMS)){const ok=parseInt(k);const nk=(remapBits((ok>>3)&7)<<3)|remapBits(ok&7);remapped[nk]=d}
  for(const k of Object.keys(HEXAGRAMS))delete HEXAGRAMS[k];Object.assign(HEXAGRAMS,remapped);
})();

function linesToKey(lines){let k=0;for(let i=0;i<6;i++)if(lines[i]===1)k|=(1<<i);return k}
function keyToLines(key){const l=[];for(let i=0;i<6;i++)l.push((key>>i)&1);return l}

// ====== Page Data ======
Page({
  data: {
    currentUser: null,
    tossProgress: ['','','','','',''],
    changingDots: [false,false,false,false,false,false],
    tossCount: 0,
    flipping: false,
    coinResultFace: '',
    lastCoins: [],
    showCoinResults: false,
    tossStatus: '请点击铜钱开始占卜',
    showResult: false,
    hexName: '', hexPinyin: '', upperTri: '', lowerTri: '',
    hexLines: [], hasChanged: false, changedHexName: '', changingCount: 0, changingNames: '',
    judgment: '', image: '', interpret: '',
    changingLines: [], changedHex: null, allLineTexts: [],
    currentReadingId: null,
    showAuthModal: false, authLoading: false,
    showDrawer: false,
    history: [],
    showToast: false, toastMsg: ''
  },

  _tosses: [],
  _currentToss: 0,
  _reading: null,

  onLoad() {
    const app = getApp();
    if (app.globalData.currentUser) {
      this.setData({ currentUser: app.globalData.currentUser });
      this._loadHistory();
    }
  },

  // ====== WeChat Auth ======
  showLogin() { this.setData({ showAuthModal: true }) },
  showRegister() { this.showLogin() }, // both open same wechat login
  closeAuthModal() { this.setData({ showAuthModal: false }) },

  handleWechatLogin() {
    this.setData({ authLoading: true });
    wx.login({
      success: res => {
        if (!res.code) { this.setData({ authLoading: false }); return; }
        wx.request({
          url: `${SUPABASE_URL}/functions/v1/wechat-login`,
          method: 'POST',
          header: { ...HEADERS, 'Content-Type': 'application/json' },
          data: { code: res.code },
          success: resp => {
            if (resp.statusCode === 200 && resp.data && resp.data.openid) {
              this._loginAs(resp.data.openid);
              this.setData({ showAuthModal: false, authLoading: false });
              this._toast('微信登录成功');
            } else {
              this._fallbackLogin();
            }
          },
          fail: () => this._fallbackLogin()
        });
      },
      fail: () => this.setData({ authLoading: false })
    });
  },

  _fallbackLogin() {
    let deviceId = wx.getStorageSync('liuyao_device_id');
    if (!deviceId) {
      deviceId = 'wx_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      wx.setStorageSync('liuyao_device_id', deviceId);
    }
    this._loginAs(deviceId);
    this.setData({ showAuthModal: false, authLoading: false });
    this._toast('登录成功');
  },

  _loginAs(uid) {
    const app = getApp();
    app.globalData.currentUser = uid;
    wx.setStorageSync('liuyao_auth', uid);
    this.setData({ currentUser: uid });
    this._loadHistory();
  },

  logout() {
    const app = getApp();
    app.globalData.currentUser = null;
    wx.removeStorageSync('liuyao_auth');
    this.setData({ currentUser: null, history: [], showDrawer: false });
    this._toast('已退出登录');
  },

  _loadHistory() {
    const user = this.data.currentUser;
    if (!user) return;
    wx.request({
      url: `${SUPABASE_URL}/rest/v1/liuyao_records?username=eq.${encodeURIComponent(user)}&select=record_data&order=created_at.asc`,
      header: HEADERS, success: res => {
        this.setData({ history: (res.data || []).map(r => r.record_data) });
      }
    });
  },

  _saveHistory() {
    const user = this.data.currentUser;
    if (!user) return;
    wx.request({
      url: `${SUPABASE_URL}/rest/v1/liuyao_records?username=eq.${encodeURIComponent(user)}`,
      method: 'DELETE', header: HEADERS, complete: () => {
        const records = this.data.history;
        function insertOne(i) {
          if (i >= records.length) return;
          wx.request({
            url: `${SUPABASE_URL}/rest/v1/liuyao_records`, method: 'POST',
            header: { ...HEADERS, 'Prefer': 'return=minimal' },
            data: { username: user, record_data: records[i] },
            complete: () => insertOne(i + 1)
          });
        }
        insertOne(0);
      }
    });
  },

  // ====== Drawer ======
  openDrawer() { this.setData({ showDrawer: true }) },
  closeDrawer() { this.setData({ showDrawer: false }) },

  loadRecord(e) {
    const id = e.currentTarget.dataset.id;
    const record = this.data.history.find(h => h.id === id);
    if (!record) return;
    this._reading = record;
    this.setData({ currentReadingId: id, showDrawer: false });
    this._displayResult(record);
  },

  deleteRecord(e) {
    const id = e.currentTarget.dataset.id;
    const history = this.data.history.filter(h => h.id !== id);
    this.setData({ history });
    if (this._reading && this._reading.id === id) {
      this._reading = null;
      this.setData({ showResult: false, currentReadingId: null });
    }
    this._saveHistory();
    this._toast('记录已删除');
  },

  clearAll() {
    if (this.data.history.length === 0) { this._toast('没有可清除的记录'); return; }
    wx.showModal({
      title: '确认清除', content: '确定要删除所有占卜记录吗？',
      success: res => {
        if (!res.confirm) return;
        this.setData({ history: [] });
        this._reading = null;
        this.setData({ showResult: false, currentReadingId: null });
        this._saveHistory();
        this._toast('所有记录已清除');
      }
    });
  },

  // ====== Coin Toss ======
  tossCoin() {
    if (this.data.flipping) return;
    if (this._currentToss >= 6) return;

    this.setData({ flipping: true, tossStatus: '铜钱转动中……' });

    setTimeout(() => {
      const result = this._generateToss();
      this._tosses.push(result);
      const isYang = result.value === 7 || result.value === 9;

      const progress = [...this.data.tossProgress];
      progress[this._currentToss] = 'completed';
      const changing = [...this.data.changingDots];
      if (result.value === 6 || result.value === 9) changing[this._currentToss] = true;

      this._currentToss++;

      let status, face, showRes;
      if (this._currentToss >= 6) {
        status = '六爻已成！正在解卦……';
        face = '';
        showRes = false;
      } else {
        status = `第 ${this._currentToss} 次完成，请抛掷第 ${this._currentToss + 1} 次`;
        face = isYang ? 'result-yang' : 'result-yin';
        showRes = true;
      }

      // Mark current dot
      if (this._currentToss < 6) progress[this._currentToss] = 'current';

      this.setData({
        flipping: false, lastCoins: result.coins, showCoinResults: showRes,
        coinResultFace: face, tossProgress: progress, changingDots: changing,
        tossCount: this._currentToss, tossStatus: status
      });

      if (this._currentToss >= 6) {
        setTimeout(() => this._completeDivination(), 1000);
      }
    }, 800);
  },

  _generateToss() {
    const coins = [Math.random()<0.5?0:1, Math.random()<0.5?0:1, Math.random()<0.5?0:1];
    const sum = coins.reduce((s,c)=>s+(c===1?3:2),0);
    return { value: sum, coins, timestamp: Date.now() };
  },

  _completeDivination() {
    const origLines = this._tosses.map(t => t.value===9||t.value===7?1:0);
    const changedLines = this._tosses.map(t => t.value===6?1:t.value===9?0:(t.value===7?1:0));
    const origKey = linesToKey(origLines);
    const changedKey = linesToKey(changedLines);
    const hex = HEXAGRAMS[origKey];
    if (!hex) { this._toast('卦象异常，请重试'); return; }

    const changingIdx = [];
    this._tosses.forEach((t,i)=>{if(t.value===6||t.value===9)changingIdx.push(i)});

    const reading = {
      id: 'lv_'+Date.now(),
      date: new Date().toLocaleString('zh-CN',{month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}),
      tosses: [...this._tosses], originalKey: origKey, changedKey,
      hexName: hex.name, hexPinyin: hex.pinyin,
      changingLineIndices: changingIdx,
      hasChanged: changedKey !== origKey,
      summary: hex.judgment.substring(0,30)+'……'
    };

    this._reading = reading;
    const history = [...this.data.history, reading];
    this.setData({ history, currentReadingId: reading.id });
    this._saveHistory();
    this._displayResult(reading);
  },

  _displayResult(reading) {
    const hex = HEXAGRAMS[reading.originalKey];
    const chHex = HEXAGRAMS[reading.changedKey];
    const upperKey = (reading.originalKey>>3)&7, lowerKey = reading.originalKey&7;
    const lines = keyToLines(reading.originalKey);
    const chSet = new Set(reading.changingLineIndices);
    const labels = ['初','二','三','四','五','上'];

    const hexLines = [];
    for (let i=5;i>=0;i--) {
      hexLines.push({
        label: labels[i], yang: lines[i]===1,
        changing: chSet.has(i),
      });
    }

    const changingLines = reading.changingLineIndices.map(i => ({
      label: labels[i], text: hex.lines[i]
    }));

    const allLineTexts = hex.lines.map((l,i)=>({
      text: l, changing: chSet.has(i)
    }));

    this.setData({
      showResult: true,
      hexName: hex.name, hexPinyin: hex.pinyin,
      upperTri: TRIGRAMS[upperKey]?TRIGRAMS[upperKey].symbol:'',
      lowerTri: TRIGRAMS[lowerKey]?TRIGRAMS[lowerKey].symbol:'',
      hexLines, hasChanged: reading.hasChanged,
      changedHexName: chHex?chHex.name:'',
      changingCount: reading.changingLineIndices.length,
      changingNames: reading.changingLineIndices.map(i=>labels[i]+'爻').join('、'),
      judgment: hex.judgment, image: hex.image, interpret: hex.interpret,
      changingLines, changedHex: reading.hasChanged?chHex:null,
      allLineTexts
    });
  },

  resetDivination() {
    this._tosses = [];
    this._currentToss = 0;
    this._reading = null;
    this.setData({
      tossCount: 0, flipping: false, coinResultFace: '',
      lastCoins: [], showCoinResults: false,
      tossStatus: '请点击铜钱开始占卜',
      tossProgress: ['','','','','',''],
      changingDots: [false,false,false,false,false,false],
      showResult: false, currentReadingId: null
    });
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  },

  // ====== Toast ======
  _toast(msg) {
    this.setData({ showToast: true, toastMsg: msg });
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => this.setData({ showToast: false }), 2500);
  }
});