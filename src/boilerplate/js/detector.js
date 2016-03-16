// check for get parameter
// check for cookie

UseDetector = new function() {
	

	this.include = function() {

		var segment = this.getParam("segment");
		if(!segment) {
			segment = this.getCookie("segment");
		}
		if(!segment) {
			segment = Detector.getSegment(navigator.userAgent);
		}

		if((this.getParam("dev") && this.getParam("dev") != "0") || (this.getCookie("dev") && this.getCookie("dev") != "0")) {
			document.write('<script type="text/javascript" src="/js/lib/seg_'+segment+'_include.js"></script>');
			document.write('<link type="text/css" href="/css/lib/seg_'+segment+'_include.css" rel="stylesheet" media="all" />');
		}
		else {
			document.write('<script type="text/javascript" src="/js/seg_'+segment+'.js"></script>');
			document.write('<link type="text/css" href="/css/seg_'+segment+'.css" rel="stylesheet" media="all" />');
		}

	}


	this.getParam = function(which) {
		var regexp = new RegExp("[\&\?\b]{1}"+which+"\=([^\&\b]+)");
		var match = location.search.match(regexp);
		if(match && match.length > 1) {
			document.cookie = encodeURIComponent(which) + "=" + encodeURIComponent(match[1]) + ";path=/";
			return match[1];
		}
		else {
			return "";
		}
	}

	this.getCookie = function(which) {
		var matches;
		return (matches = document.cookie.match(encodeURIComponent(which) + "=([^;]+)")) ? decodeURIComponent(matches[1]) : false;
	}

}


// ORIGINAL DETECTOR CODE

Detector = new function() {

	this.getSegment = function(ua) {

		var segment = this.identify(ua);
		var groups = [];

		groups["desktop_edge"] = "desktop";
		groups["desktop_ie11"] = "desktop";
		groups["desktop"] = "desktop";
		groups["desktop_ie10"] = "desktop";
		groups["tablet"] = "desktop";

		groups["smartphone"] = "smartphone";

		groups["desktop_ie9"] = "desktop_light";
		groups["desktop_light"] = "desktop_light";
		groups["tablet_light"] = "desktop_light";

		groups["mobile"] = "unsupported";
		groups["mobile_light"] = "unsupported";
		groups["tv"] = "unsupported";

		groups["seo"] = "seo";

		if(groups[segment]) {
			return groups[segment];
		}
		else {
			return segment;
		}

	}

	this.identify = function(ua) {

		if(!ua.match(/(chromeframe|phone|mobile|opera|windows[ ]?ce|macintosh)/i) && ua.match(/(msie|trident)/i)) {
			if(ua.match(/(MSIE 9.0)/i)) {
				return "desktop_ie9";
			}
			else if(ua.match(/(MSIE 10.0)/i)) {
				return "desktop_ie10";
			}
			else if(!ua.match(/(msie)/i) && ua.match(/(trident\/7)/i)) {
				return "desktop_ie11";
			}
		}
		if(!ua.match(/(ipad|ipod|mobile|android|fennec|phone|symbian|midp|kindle|smart-tv)/i)) {
			if(!ua.match(/(chrome|bb10|tizen|Chromium|konqueror|msie|trident)/i) && ua.match(/(AppleWebKit\/(53[7-9]|6[0-9][0-9])\b[^$]+safari)/i)) {
				return "desktop_edge";
			}
			else if(!ua.match(/(chromeframe|msie|trident|edge\/12)/i) && ua.match(/((chrome|chromium)\/(2[5-9]|[3-6][0-9])\b)/i)) {
				return "desktop_edge";
			}
			else if(!ua.match(/(msie|trident)/i) && ua.match(/(firefox\/(2[2-9]|[34][0-9]|50)\b)/i)) {
				return "desktop_edge";
			}
			else if(!ua.match(/(msie)/i) && ua.match(/(windows NT[^$]+edge\/1[2-5])/i)) {
				return "desktop_edge";
			}
			else if(!ua.match(/(chrome|silk|tizen|bb10|konqueror|Chromium|msie|trident|tablet)/i) && ua.match(/(AppleWebKit\/53[4-6]\b[^$]+safari)/i)) {
				return "desktop";
			}
			else if(!ua.match(/(chromeframe|msie|trident)/i) && ua.match(/((chrome|chromium)\/([7-9]|1[0-9]|2[0-4])\b)/i)) {
				return "desktop";
			}
			else if(ua.match(/(chromeframe\/([7-9]|[1-3][0-9]))/i)) {
				return "desktop";
			}
			else if(!ua.match(/(trident|msie)/i) && ua.match(/(firefox\/([7-9]|1[0-9]|2[0-1])\b)/i)) {
				return "desktop";
			}
			else if(ua.match(/(Konqueror\/[4-9])/i)) {
				return "desktop";
			}
		}
		if(ua.match(/(Wii|Playstation \d|smart-tv)/i)) {
			return "tv";
		}
		if(!ua.match(/(mobile|phone|tablet|ipad|ipod|fennec|android|symbian|midp|windows[ ]?ce|htc|kindle|palm|armv[5-6]|smart-tv)/i)) {
			if(!ua.match(/(chrome|webos|smart-tv|konqueror|Chromium)/i) && ua.match(/(AppleWebKit\/([0-9][0-9]|[1-4][0-9]{2}|5[0-2][0-9]|53[0-3])\b[^$]+safari)/i)) {
				return "desktop_light";
			}
			else if(ua.match(/(chrome\/[0-6]\b)/i)) {
				return "desktop_light";
			}
			else if(!ua.match(/(Opera|chromeframe|Motorola|Samsung|\d\d\dx\d\d\d|nokia|NetFront)/i) && ua.match(/(MSIE [1-8]\b)/i)) {
				return "desktop_light";
			}
			else if(!ua.match(/(msie|trident|Maemo|Sony\/COM2)/i) && ua.match(/(seamonkey\/([0-1]|2\.0)\b|Epiphany\/([0-1]|2\.[1-2])|(firefox|firebird|iceweasel|minefield|thunderbird|bonecho|Namoroka)\/[0-6]\b)/i)) {
				return "desktop_light";
			}
			else if(!ua.match(/(opera mini|opera mobi|KDDI|($|\b)mot|xda_|samsung|Nitro|Nintendo)/i) && ua.match(/(opera[ \/]?[1-9]\.[0-7]|opera[ \/]?9\.8[^$]+version\/1[0-2])/i)) {
				return "desktop_light";
			}
			else if(ua.match(/(konqueror\/[1-3])/i)) {
				return "desktop_light";
			}
			else if(ua.match(/(chromeframe\/[5-6]\b|chromeframe;)/i)) {
				return "desktop_light";
			}
		}
		if(!ua.match(/(midp)/i) && ua.match(/(ipad|webkit|android|tablet)/i)) {
			if(ua.match(/(ipad[^$]+AppleWebKit\/([6-7][0-9]{2})[^$]+mobile\/1[2-6]|ipad[^$]+fbsv\/([8-9]|1[0-2])[^$]+tablet)/i)) {
				return "tablet";
			}
			else if(ua.match(/(tablet[^$]+firefox\/(2[2-9]|[34][0-9]|50)\b)/i)) {
				return "tablet";
			}
			else if(!ua.match(/(padfone|^(?!.*(chrome\/[3-9][0-9]))|^(?!.*android)|dalvik)/i) && ua.match(/((nexus (7|9|10))|tablet|(HTC[^$]*(flyer|jetstream|p51[0-2]{1}))|(xoom|MZ[5-6][0-9]{2})|(lifetab)|((ideatab|lenovo)[^$]*(a[1-7][0-6][079]|b[68]0[08]0|S6000|TAB s8)|ideapada10)|(folio_|AT(7|10|[1237][037]0))|(one[ _\-]?touch[ _\-]?(P[0-9]{3}|tab|evo|t10|9005)|i213)|( slate[ ]?(7|8|9|10|12|17|21)|slatebook|TouchPad)|(RCT6)|( n1 )|(archos ([7-9]|10)([0-9]))|(mediapad)|(viewpad)|(PAD-FMD700)|(nook|BNTV)|(SGP[T0-9]{3}|SO-0(3E|5F))|(SM-(T|P)[0-9]{3}|GT-(P[0-9]{4}|N(5|8)[0-9]{3})|SGH-(I(467|497|957)|T779)|SCH-I(705|800|815|905|915|925)|SPH-P500)|(transformer|TF300|Slider SL|; K0[0-1][A-Z0-9] b|ME(1|3|5)[0-9]{2})|(NX(0|7))|(; arc b)|(Kindle fire| KF[A-Z]{2,4} b)|(hudl)|(Edison|Aquaris E10)|(; A[1257][0-9]{2} b|A1-(7|8)[0-9]{2}|A3-A[0-2]{2} b|B1-[A0-9]{3})|(LG-V[4-9][0-9]{2})|(en-tab|TAB-E419)|(QMV7|Smart[ ]?Tab)|(TA[BCDQ]-[0-9]{5})|(Cintiq)|(Endeavour|Discovery)|(polypad)|(ZTE_E9Q)|(; (T[1-5][0-9]{2}|R101|PS47) )|(tab-protab)|(tab-p)|(; b-tab)|(lenco[^$]+tab-(74|92))|(iqtab)|(freetab)|(mytab)|(tab(1004|[7-8][0-4]4))|( tab [1-9][0-9]{2})|( TAB7[0-9]{2})|(e-tab)|(vtab)|(i-life wtab )|(@tab-(seven|eight|nine|ten|thirteen))|(APPTAB(7|9))|((xenta|noble|luna) tab)|(tolino tab)|(AG Chrome Go Tab))/i)) {
				return "tablet";
			}
			else if(ua.match(/((playbook)[^$]+(rim|oid)[^$]+bkit\/(53(7\.[3-9]|[8-9]))|Linux; U; (?!Android)[^$]+(; KF[A-Z]+ )[^$]+bkit\/(53(7\.[3-9]|[8-9]))[^$]+(silk)|hp-tablet[^$]+bkit\/(53(7\.[3-9]|[8-9]))[^$]+TouchPad)/i)) {
				return "tablet";
			}
			else if(ua.match(/(ipad[^$]+fbsv\/[4-7][^$]+tablet|ipad[^$]+AppleWebKit\/[6]?53[1-9][^$]+mobile\/([7-9]|1[0-2]))/i)) {
				return "tablet_light";
			}
			else if(ua.match(/(tablet[^$]+firefox\/([0-9]|1[0-9]|2[0-1])\b)/i)) {
				return "tablet_light";
			}
			else if(ua.match(/(ipad[^$]+opera[^$]+version\/([1-9]|1[0-2])|Opera Tablet[^$]+version\/([1-9]|1[0-2])\b)/i)) {
				return "tablet_light";
			}
			else if(ua.match(/(hp-tablet[^$]+bkit\/(53([1-6]|7\.[0-2]))[^$]+TouchPad|(playbook)[^$]+(rim|oid)[^$]+bkit\/(53([0-6]|7\.[0-2]))|Linux; U; (?!Android)[^$]+(; KF[A-Z]+ )[^$]+bkit\/(53([0-6]|7\.[0-2]))[^$]+(silk))/i)) {
				return "tablet_light";
			}
			else if(!ua.match(/(chrome\/[3-9][0-9]|webkit\/[3-4]|^(?!.*android)|opera|msie|firefox|dalvik)/i) && ua.match(/((nexus (7|9|10))|tablet|(HTC[^$]*(flyer|jetstream|p51[0-2]{1}))|(xoom|MZ[5-6][0-9]{2})|(lifetab)|((ideatab|lenovo)[^$]*(a[1-7][0-6][079]|b[68]0[08]0|S6000|TAB s8)|ideapada10)|(folio_|AT(7|10|[1237][037]0))|(one[ _\-]?touch[ _\-]?(P[0-9]{3}|tab|evo|t10|9005)|i213)|( slate[ ]?(7|8|9|10|12|17|21)|slatebook|TouchPad)|(RCT6)|( n1 )|(archos ([7-9]|10)([0-9]))|(mediapad)|(viewpad)|(PAD-FMD700)|(nook|BNTV)|(SGP[T0-9]{3}|SO-0(3E|5F))|(SM-(T|P)[0-9]{3}|GT-(P[0-9]{4}|N(5|8)[0-9]{3})|SGH-(I(467|497|957)|T779)|SCH-I(705|800|815|905|915|925)|SPH-P500)|(transformer|TF300|Slider SL|; K0[0-1][A-Z0-9] b|ME(1|3|5)[0-9]{2})|(NX(0|7))|(; arc b)|(Kindle fire| KF[A-Z]{2,4} b)|(hudl)|(Edison|Aquaris E10)|(; A[1257][0-9]{2} b|A1-(7|8)[0-9]{2}|A3-A[0-2]{2} b|B1-[A0-9]{3})|(LG-V[4-9][0-9]{2})|(en-tab|TAB-E419)|(QMV7|Smart[ ]?Tab)|(TA[BCDQ]-[0-9]{5})|(Cintiq)|(Endeavour|Discovery)|(polypad)|(ZTE_E9Q)|(; (T[1-5][0-9]{2}|R101|PS47) )|(tab-protab)|(tab-p)|(; b-tab)|(lenco[^$]+tab-(74|92))|(iqtab)|(freetab)|(mytab)|(tab(1004|[7-8][0-4]4))|( tab [1-9][0-9]{2})|( TAB7[0-9]{2})|(e-tab)|(vtab)|(i-life wtab )|(@tab-(seven|eight|nine|ten|thirteen))|(APPTAB(7|9))|((xenta|noble|luna) tab)|(tolino tab)|(AG Chrome Go Tab))/i)) {
				return "tablet_light";
			}
		}
		if(!ua.match(/(msie|midp|symbian)/i) && ua.match(/(android|webkit|iphone|windows phone)/i)) {
			if(!ua.match(/(tablet|ipad)/i) && ua.match(/((iphone)[^$]+AppleWebKit\/(53[4-9]|6[0-9][0-9])[^$]+mobile\/1[0-5]|(iphone)[^$]+fbsv\/([6-9]|1[0-2]))/i)) {
				return "smartphone";
			}
			else if(!ua.match(/(maemo)/i) && ua.match(/(mobile[^$]+firefox\/([1-5][0-9])\b|android[^$]+fennec\/([1-5][0-9])\b)/i)) {
				return "smartphone";
			}
			else if(!ua.match(/(dalvik|trident)/i) && ua.match(/(android[^$]+AppleWebKit\/(53[4-9]|6[0-9][0-9]))/i)) {
				return "smartphone";
			}
			else if(ua.match(/((GT-S(8600|5380|8530|5253|8500)|Nokia(N9)|BlackBerry 98(60|10|00)|BB10; touch|playstation vita)[^$]+AppleWebKit\/(53[4-9]|6[0-9][0-9]))/i)) {
				return "smartphone";
			}
			else if(ua.match(/(touch[^$]+IEMobile\/11)/i)) {
				return "smartphone";
			}
		}
		if(!ua.match(/(tablet|ipad)/i) && ua.match(/((ipod|iphone)[^$]+AppleWebKit\/([1-4]|5[0-2][0-9]|53[0-3])|(iphone|ipod)[^$]+fbsv\/[3-5][^$]|(ipod|iphone)[^$]+AppleWebKit[^$]+mobile\/[3-9])/i)) {
			return "mobile";
		}
		else if(!ua.match(/(opera|msie)/i) && ua.match(/(fennec|mobile[^$]+firefox|maemo|armv6[^$]+firefox)/i)) {
			return "mobile";
		}
		else if(!ua.match(/(tablet|ipad)/i) && ua.match(/(opera\/9[^$]+Opera mobi|Opera Mini\/([4-9]|[1-2][0-9])|opera[\/ ]?(9|1[0-2])[^$]+midp|(htc|samsung|symbian|midp|windows[ ]?(ce|phone|mobile|armv))[^$]+opera[\/ ]?(9|1[0-2])\b)/i)) {
			return "mobile";
		}
		else if(!ua.match(/(netfront|opera)/i) && ua.match(/(MSIE (9|10).0;[^$]+Windows Phone|IEMobile\/(9|10))/i)) {
			return "mobile";
		}
		else if(!ua.match(/(iemobile)/i) && ua.match(/(android[^$]+AppleWebKit\/([3-4]|5([0-2]|3[0-3])))/i)) {
			return "mobile";
		}
		else if(!ua.match(/(iphone|ipad|ipod|msie|opera|android)/i) && ua.match(/(netfront\/(3.[4-5]|4)|browser\/NF\/3\.[4-5]|up\.browser[\/ ]?7|(obigo|teleca|Obigo[ ]?Internet[ ]?Browser|obigo-browser)[\/Q0-]+[5-7]|(obigo|teleca|Obigo[ ]?Internet[ ]?Browser|obigo-browser|telecabrowser)[\/Q0-]+[5-7]|webkit[^$]+mobile|midp-2[^$]+webkit|webOS[^$]+webkit|nokia[^$]+webkit|BB10; Kbd|(docomo[^$]+\(|foma;)c(1\d|[5-9])\d\d;|ucbrowser\/(1[0-9]|[8-9])[^$]+mobile|webkit[^$]+midp-2)/i)) {
			return "mobile";
		}
		else if(!ua.match(/(opera|netfront)/i) && ua.match(/(MobileExplorer|MSIE[^$]+windows[ ]?ce|IEMobile ([1-8])|MSIE (6|7).0;[^$]+Windows Phone|msie[^$]+(midp|palmsource))/i)) {
			return "mobile_light";
		}
		else if(ua.match(/(Opera Mini\/[1-3]\b|(symbian|midp|windows[ ]?ce|armv|nitro)[^$]+opera[\/ ]?[0-8]?|opera[^$]+(mobile|midp|DSi))/i)) {
			return "mobile_light";
		}
		else if(!ua.match(/(webkit|opera|iemobile|netfront\/3\.[4-9]|telecabrowser[\/Q0-]+[5-7]|up\.browser[\/ ]?7|msie)/i) && ua.match(/(netfront|Openwave|up\.browser|semc-browser|(\bmic[-\/]|obigo|teleca)|docomo|portalmmm|palmos|polaris|au[-\.]|jasmine|midp|\bnf\b)/i)) {
			return "mobile_light";
		}
		if(ua.match(/(w3\.org|W3C|validator)/i)) {
			return "seo";
		}
		else if(!ua.match(/(^DoCoMo|webkit|trident)/i) && ua.match(/(^nutch|^java\/\d|^perl|CFNetwork|^python|^php|^curl|^apache|^ruby|^Acoon|^Wget|^feed|^wordpress|mail\.ru|^findlinks|^libwww|^google|^yandex|^yahoo|^findfiles|^acoon|^CatchBot|^Baiduspider|^ia_archiver|^http|^msnbot|^googlebot|^yacybot|^Screaming Frog|^xenu|^diggbot|^appengine|^okhttp|^rogerbot|^scrapy|^Readability|^PycURL|^Gigabot|^lwp|^jakarta|^link|^DomainCrawler|^Dolphin|^EhName|^NCBot|^NetNewsWire|^OpenWebIndex|^PagesInventory|^Zookabot|^HotJava|HTTP[ ]?Client|^Pinterest|^facebookexternalhit|^AdsBot|^HostHarvest|^Twitterbot|^ELinks|^CRAZYWEBCRAWLER|^NetzCheckBot|^SimplePie|^bot|^Dillo|^InterMapper|^Giga)/i)) {
			return "seo";
		}
		else if(!ua.match(/(midp)/i) && ua.match(/(lynx\b)/i)) {
			return "seo";
		}
		if(!ua.match(/(mobile|phone|opera)/i) && ua.match(/(msie[ ]?9)/i)) {
			return "desktop_ie9";
		}
		else if(!ua.match(/(phone|mobile)/i) && ua.match(/(msie[ ]?10)/i)) {
			return "desktop_ie10";
		}
		else if(!ua.match(/(mobile|phone|tablet|midp|ipad|windows[ ]?ce|android|wap)/i) && ua.match(/(airmail|(firefox|chrome)\/([7-9]|\d\d)|webkit\/(53[4-9]|6\d\d))/i)) {
			return "desktop";
		}
		else if(!ua.match(/(phone|mobile|windows[ ]?ce|midp|wap|brew|\d\d\dx\d\d\d|opera|nokia|symbian|motorola|NetFront|Palm)/i) && ua.match(/(msie[ ]?[0-8]\b|Internet Explorer)/i)) {
			return "desktop_light";
		}
		else if(!ua.match(/(phone|mobile|ipad|android|tablet|midp|wap|windows[ ]?ce|\d\d\dx\d\d\d|symbian)/i) && ua.match(/(windows[\+ ]?(9[58]|xp|nt)|firefox|chrome|webkit|Macintosh|x11|wpdesktop|win[\+ ]?(9[58x]|xp|nt)|excel|powerpoint|outlook)/i)) {
			return "desktop_light";
		}
		else if(ua.match(/(ipad|tablet)/i)) {
			return "tablet_light";
		}
		else if(ua.match(/(iphone|android|webkit)/i)) {
			return "mobile";
		}
		else if(!ua.match(/(http[s]?:|@)/i) && ua.match(/(MIDP|iPAQ|^LENOVO|^pt-|^zte-|^mot|^sanyo|nokia|\bsharp|kddi|blackberry|^audio|^CDM-|^(siemens|sie-)|(samsung|sec\b|sgh|sch\b|spv)|sonyericsson|palm|wap|^lg|^VX|UC(browser|web)|^Haier|^Gradiente|^PANTECH|^PG-|^sagem|brew|\bnec\b|hiptop|Hutc3G|^amoi|alcatel|Mitsu|BenQ|SoftBank|o2|vodafone|^fly|^inno|^EZZE|foma\b|^sendo|Panasonic|phone|mobile|sms|mms|qtek|^tsm|^ASUS|^IXI|^TIM|^Psion|\d\d\dx\d\d\d|armv|^TCL|^Telit|^UTSTAR|PSP|htc|symbian|windows[ ]?ce|opera[ \d\b]|Motorola|PHILIPS|Huawei|^bird|^KWC|^toshiba|^compal|^dbtel|^sam|^grundig|^dallab|^newgen|nintendo)/i)) {
			return "mobile_light";
		}
		else if(ua.match(/(link|bot|python|curl|php|wget|feed|google|yahoo|bing|yandex|word|http|ruby|crawl|spider|check|jakarta|apache|webdav|nutch|link[ ]?check|acoon|domain|fetch|site|parse|@|url|search|proxy|nikto|follow|stat|scan|client|TYPO3|node|web|bookmark|agent|textmode|api|uri|net|baidu|digg|Catalog|perl|server|PubSub|tweet|news|Mechanize|www|hatena|seo|scour|index|source|scrape|rss|optimi|analy)/i)) {
			return "seo";
		}
	}

}


UseDetector.include();

