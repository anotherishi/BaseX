// declarations

window.onload = screen.orientation.onchange = () => {
    let angle = screen.orientation.angle;
    document.documentElement.style.setProperty(
        "--wh",
        (angle == 90 || angle == 270 ? innerWidth : innerHeight) + "px"
    );
};

const form = document.getElementById("num-input");

const numSys = {
    bin: "Binary",
    oct: "Octal",
    dec: "Decimal",
    hex: "HexaDecimal",
};

const charsAllowed = {
    bin: /[01]/g,
    oct: /[01234567]/g,
    dec: /[0-9]/g,
    hex: /[0-9a-zA-Z]/g,
};

let set = new Set(Object.keys(numSys));

// fn calls

createI();

// fns

function createI() {
    for (const numSysShort in numSys) {
        let inpSection = classedElement("inp-section", "article");
        let inpTitle = classedElement("inp-heading", "h2");
        let inpLabel = classedElement("inp-label", "label");
        let explBtn = classedElement("expl-btn", "img");
        let copyBtn = classedElement("copy-btn", "img");
        let inpField = classedElement("inp-field", "input");

        explBtn.src = "res/explanation.png";
        copyBtn.src = "res/copy.png";
        inpField.value = "0";
        inpField.id = "inp-" + numSysShort;
        inpLabel.setAttribute("for", "inp-" + numSysShort);
        inpLabel.innerText = numSys[numSysShort];

        inpField.oninput = (inputEvent) => {
            console.log(inputEvent);
            let cval = inpField.value;
            let data = inputEvent.data;
            let regex = charsAllowed[numSysShort];

            if (cval.startsWith("0")) inpField.value = removeLeadingZeros(cval);
            if (cval == "") inpField.value = 0;
            if (
                (inputEvent.inputType == "insertText" ||
                    inputEvent.inputType == "insertFromPaste") &&
                regex.test(data)
            ) {
                console.log("ok", regex.test(data), data, regex);
            } else {
                console.log("err", regex.test(data), data, regex);
                inpField.value = cval.replaceAll(data, "");
            }
        };

        copyBtn.onclick = () => {
            navigator.clipboard
                .writeText(inpField.value)
                .then(() => navigator.vibrate([70, 40, 40]));
        };

        inpTitle.appendChild(inpLabel);
        inpSection.appendChild(inpTitle);
        inpSection.appendChild(explBtn);
        inpSection.appendChild(copyBtn);
        inpSection.appendChild(inpField);
        form.appendChild(inpSection);
    }
}

function classedElement(className, elementName = "div") {
    let element = document.createElement(elementName);
    element.className = className;
    return element;
}

function removeLeadingZeros(number) {
    return number.replace(/^0+/, "");
}
