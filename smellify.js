// iterate over all elements of document.body and check if they have text

const replaceMap = {
    "checo": "cheiro",
    "checas": "cheiras",
    "checa": "cheira",
    "checamos": "cheiramos",
    "checais": "cheirais",
    "checam": "cheiram",
    "checava": "cheirava",
    "checavas": "cheiravas",
    "checávamos": "cheirávamos",
    "checáveis": "cheiráveis",
    "checavam": "cheiravam",
    "chequei": "cheirei",
    "checaste": "cheiraste",
    "checou": "cheirou",
    "checastes": "cheirastes",
    "checaram": "cheiraram",
    "checara": "cheirara",
    "checaras": "cheiraras",
    "checáramos": "cheiráramos",
    "checáreis": "cheiráreis",
    "checarei": "cheirarei",
    "checarás": "cheirarás",
    "checará": "cheirará",
    "checaremos": "cheiraremos",
    "checareis": "cheirareis",
    "checarão": "cheirarão",
    "checaria": "cheiraria",
    "checarias": "cheirarias",
    "checaríamos": "cheiraríamos",
    "checaríeis": "cheiraríeis",
    "checariam": "cheirariam",
    "cheque": "cheire",
    "cheques": "cheires",
    "chequemos": "cheiremos",
    "chequeis": "cheireis",
    "chequem": "cheirem",
    "checasse": "cheirasse",
    "checasses": "cheirasses",
    "checássemos": "cheirássemos",
    "checásseis": "cheirásseis",
    "checassem": "cheirassem",
    "checar": "cheirar",
    "checares": "cheirares",
    "checarmos": "cheirarmos",
    "checardes": "cheirardes",
    "checarem": "cheirarem",
    "checai": "cheirai",
    "fato": "flato",
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

const observer = new MutationObserver(function(mutations) {
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

document.querySelectorAll('*').forEach(smellifyContents);

