const ObjectId = require("mongodb").ObjectId;
const mongo = require("../db");
const groupModel = require("./group.model")
const testModel = require("./test.model")
const stepTypes = require("../constants/Step.types")

const SIGN_PREFIX = 'SIGN'
const EQUALS =       `${SIGN_PREFIX}:EQUALS`
const ENDS_WITH =    `${SIGN_PREFIX}:ENDS_WITH`
const STARTS_WITH =  `${SIGN_PREFIX}:STARTS_WITH`
const CONTAIN =      `${SIGN_PREFIX}:CONTAIN`
const MATCH =        `${SIGN_PREFIX}:MATCH`

const STATE_PREFIX = 'ASSERT_STATE'
const IS_PRESENT =  `${STATE_PREFIX}:IS_PRESENT`
const IS_VISIBLE =  `${STATE_PREFIX}:IS_VISIBLE`
const IS_ENABLED = `${STATE_PREFIX}:IS_ENABLED`
const IS_FOCUSED =  `${STATE_PREFIX}:IS_FOCUSED`
const IS_SELECTED = `${STATE_PREFIX}:IS_SELECTED`

const dbName = "app";

async function getGeneratedCode(projectId, userEmail){

    let code = `module.exports = {\n`

    let projectGroups = await groupModel.getProjectGroups(projectId, userEmail)
    // console.log(projectGroups);
    for (let i = 0; i < projectGroups.length; i++){
        let g = projectGroups[i]
        code += `// ${g.name} BEGIN\n`;
        code += (await recSubGroup(g.projectId, String(g._id), userEmail))
        code += `// ${g.name} END\n`;
    }
    code += `}`
    return code
}

async function recSubGroup(projectId, groupId, userEmail, ){
    let code = ``
    let subGroups = (await groupModel.getSubGroups(projectId, groupId, userEmail))
    console.log("SUBGROUPS", subGroups)
    if(subGroups.length > 0){
        for(let i = 0; i<subGroups.length; i++){
            let g = subGroups[i]
            code += `// ${g.name} BEGIN\n`;
            code += (await recSubGroup(g.projectId, String(g._id), userEmail))
            code += `// ${g.name} END\n`;
        }
    }
    
    let subTests = (await testModel.getSubTests(projectId, groupId, userEmail))
    if(subTests.length > 0){
        for(let j=0; j<subTests.length; j++){
            let t = subTests[j]
            code += (await generateTestCode(t.name, t.projectId, t.groupId, t._id))
        }
    }
    return code
}

async function generateTestCode(testName, projectId, groupId, testId){
    let code = ``
    console.log(`generateTestCode: ${projectId}, ${testId}`);
    let steps = await testModel.getSteps(projectId, groupId, testId)
    if(steps.length > 0){
        code += `"${testName}": function(browser){\n`
        code += `browser.useCss();\n`;
        code += `browser.init();\n`;
        for(let i=0; i<steps.length; i++){
            let s = steps[i]
            code += generateStepCode(s)
        }
        code += `\n}\n`
    }
    return code
}

function generateStepCode(step){
    let code = ``
    let form = step.form
    let action
    let comparator
    let sign
    let answer
    let cssSelector=""
    switch(step.stype){
        // Document context
        case stepTypes.BROWSER_URL:
            code += `browser.url("${form.link}");\n`
        break
        case stepTypes.BROWSER_ACTION:
            if(form.action == "1") action = 'back'
            if(form.action == "2") action = 'refresh'
            if(form.action == "3") action = 'forward'
            code += `browser.${action}();\n`
        break
        case stepTypes.COOKIE_DELETE:
            code += `browser.deleteCookie("${form.cookie}");\n`
        break
        case stepTypes.COOKIE_UPDATE:
            code += `browser.setCookie({name:"${form.cookie}",value:"${form.value}"});\n`
        break
        case stepTypes.COOKIE_ASSERT:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.expect.cookie("${form.cookie}")${sign}.${comparator}("${form.text}");\n`
        break
        case stepTypes.PROMPT_SET_VALUE:
            code += `browser.setAlertText("${form.text}");\n`
        break
        case stepTypes.PROMPT_ACTION:
            answer = (form.answer == 0) ? 'dismissAlert' : 'acceptAlert'
            code += `browser.${answer}();\n`
        break
        case stepTypes.WINDOW_SET_COOR:
            code += `browser.setWindowPosition(${form.x},${form.y});\n`
        break
        case stepTypes.WINDOW_SET_SIZE:
            code += `browser.setWindowSize(${form.width},${form.height});\n`
        break
        case stepTypes.BROWSER_ASSERT_TITLE:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.title()${sign}.${comparator}("${form.text}");\n`
        break
        case stepTypes.BROWSER_ASSERT_URL:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.url()${sign}.${comparator}("${form.text}");\n`
        break
        case stepTypes.PROMPT_ASSERT:
            code += `browser.assert.ok(browser.getAlertText == "${form.text}");\n`
        break
        case stepTypes.WINDOW_ASSERT_COOR:
            code += `browser.assert.ok(browser.getWindowPosition().x == "${form.x}" && browser.getWindowPosition().y == "${form.y}");\n`
        break
        case stepTypes.WINDOW_ASSERT_SIZE:
            code += `browser.assert.ok(browser.getWindowSize().width == "${form.width}" && browser.getWindowSize().height == "${form.height}");\n`
        break
        // Element context
        case stepTypes.ELEM_CLICK:
            code += `browser.css(${cssSelector}).click();\n`
        break
        case stepTypes.ELEM_SET_VALUE:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector}).setValue(${form.value});\n`
        break
        case stepTypes.ELEM_ASSERT_STATE:
            estype = getElementState(form.estype)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector})${sign}${estype};\n`
        break
        case stepTypes.ELEM_ASSERT_VALUE:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector})${sign}.${comparator}(${form.text});\n`
        break
        case stepTypes.ELEM_ASSERT_TEXT:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector})${sign}.${comparator}(${form.text});\n`
        break
        case stepTypes.ELEM_ASSERT_TAG_NAME:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector})${sign}.${comparator}(${form.text});\n`
        break
        case stepTypes.ELEM_ASSERT_COOR:
            code += `browser.assert.ok(browser.css(${cssSelector}).getLocation().x == "${form.x}" && browser.css(${cssSelector}).getLocation().y == "${form.y}");\n`
        break
        case stepTypes.ELEM_ASSERT_SIZE:
            code += `browser.assert.ok(browser.getElementSize().width == "${form.width}" && browser.getElementSize().height == "${form.height}");\n`
        break
        case stepTypes.ELEM_ASSERT_HTML_ATTR:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector})${sign}.${comparator}(${form.text});\n`
        break
        case stepTypes.ELEM_ASSERT_CSS_PROP:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `browser.css(${cssSelector})${sign}.${comparator}(${form.text});\n`
        break
    }

    return code
}

function getSign(sign){
    return sign ? '' : '.not'
}

function getComparator(comparator){
    switch(comparator){
        case EQUALS:
            return 'equals'
        case ENDS_WITH:
            return 'endWith'
        case STARTS_WITH:
            return 'startWith'
        case CONTAIN:
            return 'contain'
        case MATCH:
            return 'match'
    }
}

function getElementState(estype){
    switch(estype){
        case IS_ENABLED:
            return '.enabled'
        // case IS_FOCUSED:
        //     return ''
        case IS_PRESENT:
            return '.present'
        case IS_SELECTED:
            return '.selected'
        case IS_VISIBLE:
            return '.visible'
    }
}

module.exports = {
    getGeneratedCode,
}