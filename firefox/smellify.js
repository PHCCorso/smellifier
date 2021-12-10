let settings = {smellify: true};

browser.storage.sync.get("smellify").then((result) => {
    if(settings && settings.smellify !== undefined) {
        settings = result;
    }

    if (settings.smellify) {
        document.querySelectorAll('*').forEach(smellifyContents);
    }
});

const replaceMap = {
    "checaríamos": "cheiraríamos",
    "checássemos": "cheirássemos",
    "checávamos": "cheirávamos",
    "checáramos": "cheiráramos",
    "checaremos": "cheiraremos",
    "checaríeis": "cheiraríeis",
    "checásseis": "cheirásseis",
    "checáveis": "cheiráveis",
    "checastes": "cheirastes",
    "checáreis": "cheiráreis",
    "checareis": "cheirareis",
    "checarias": "cheirarias",
    "checariam": "cheirariam",
    "chequemos": "cheiremos",
    "checasses": "cheirasses",
    "checassem": "cheirassem",
    "checarmos": "cheirarmos",
    "checardes": "cheirardes",
    "checamos": "cheiramos",
    "checavas": "cheiravas",
    "checavam": "cheiravam",
    "checaste": "cheiraste",
    "checaram": "cheiraram",
    "checaras": "cheiraras",
    "checarei": "cheirarei",
    "checarás": "cheirarás",
    "checarão": "cheirarão",
    "checaria": "cheiraria",
    "chequeis": "cheireis",
    "checasse": "cheirasse",
    "checares": "cheirares",
    "checarem": "cheirarem",
    "checais": "cheirais",
    "checava": "cheirava",
    "chequei": "cheirei",
    "checara": "cheirara",
    "checará": "cheirará",
    "cheques": "cheires",
    "chequem": "cheirem",
    "checas": "cheiras",
    "checam": "cheiram",
    "checou": "cheirou",
    "cheque": "cheire",
    "checar": "cheirar",
    "checai": "cheirai",
    "checo": "cheiro",
    "checa": "cheira",
    "verific": "cheir",
    "apur": "cheir",
    "averigu": "cheir",
    "investig": "cheir",
    "fato": "flato",
    "fraudulent": "flatulent",
    "fraude": "flatulência",
    "fake new": "flatulência",
    "desinformação": "flatulência"
  }

function isUpperCase(char) {
    return char === char.toUpperCase();
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


function smellify(textNode) {
    if(!textNode.textContent) { return; }

    let changed = false;
    let text = textNode.textContent;
    for (const key in replaceMap) {
        text = text.replace(new RegExp(key, 'gi'), (match) => {
            changed = true;
            if (isUpperCase(match[0])) {
                return capitalize(replaceMap[key]);
            } else {
                return replaceMap[key];
            }
        });
    }

    if (!changed) { return; }

    textNode.textContent = text;
}

function smellifyContents(element) {
    if (element.smellified) { return; }

    const nodes = element.childNodes;
    for (const node of nodes) {
        if(node.nodeType === Node.TEXT_NODE) {
            smellify(node);
        }
    }
    
    element.smellified = true;
}

const observer = new MutationObserver(async function(mutations) {
    settings = await browser.storage.sync.get("smellify");

    if (!settings.smellify) { return; }

    mutations.forEach(function(mutation) {
        if (mutation.type === "childList") {
            mutation.addedNodes.forEach(node => {
                node.querySelectorAll('*').forEach(smellifyContents);
            });
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});