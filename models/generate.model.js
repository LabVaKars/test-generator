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
const IS_DISABLED = `${STATE_PREFIX}:IS_DISABLED`
const IS_FOCUSED =  `${STATE_PREFIX}:IS_FOCUSED`
const IS_SELECTED = `${STATE_PREFIX}:IS_SELECTED`

const dbName = "app";

async function getGeneratedCode(projectId, userEmail){

    let code = `module.exports = {\n`

    let projectGroups = await groupModel.getProjectGroups(projectId, userEmail)
    // console.log(projectGroups);
    for (let i = 0; i < projectGroups.length; i++){
        let g = projectGroups[i]
        // code += `"${i+1}. ${g.name} - ${g.description}": function(browser){\n`
        code += (await recSubGroup(g.projectId, String(g._id), userEmail))
        // code += '}\n'
    }
    code += `}`
    return code
}

async function recSubGroup(projectId, groupId, userEmail, ){
    debugger
    console.log(`recSubGroup: ${projectId}, ${groupId}`);
    let code = ``
    let subGroups = (await groupModel.getSubGroups(projectId, groupId, userEmail))
    console.log("SUBGROUPS", subGroups)
    if(subGroups.length > 0){
        for(let i = 0; i<subGroups.length; i++){
            let g = subGroups[i]
            code += (await recSubGroup(g.projectId, String(g._id), userEmail))
        }
    }
    let subTests = (await testModel.getSubTests(projectId, groupId, userEmail))
    if(subTests.length > 0){
        for(let j=0; j<subTests.length; j++){
            let t = subTests[j]
            code += (await generateTestCode(t.projectId, t.groupId, t._id))
        }
    }
    return code
}

async function generateTestCode(projectId, groupId, testId){
    let code = ``
    console.log(`generateTestCode: ${projectId}, ${testId}`);
    let steps = await testModel.getSteps(projectId, groupId, testId)
    if(steps.length > 0){
        code += `"Test name": function(browser){\n`
        code += `browser\n`;
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
        case stepTypes.BROWSER_URL:
            code += `.url("${form.link}")\n`
        break
        case stepTypes.BROWSER_ACTION:
            console.log("form", form);
            
            if(form.action == "1") action = 'back'
            if(form.action == "2") action = 'refresh'
            if(form.action == "3") action = 'forward'
            code += `.${action}()\n`
        break
        case stepTypes.COOKIE_DELETE:
            code += `.deleteCookie("${form.cookie}")\n`
        break
        case stepTypes.COOKIE_UPDATE:
            code += `.setCookie({name:"${form.cookie}",value:"${form.value}"})\n`
        break
        case stepTypes.COOKIE_ASSERT:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code =+ `.expect.cookie("${form.cookie}")${sign}.${comparator}("${form.text}")\n`
        break
        case stepTypes.PROMPT_SET_VALUE:
            code += `.setAlertText("${form.text}")\n`
        break
        case stepTypes.PROMPT_ACTION:
            answer = (form.answer == 0) ? 'dismissAlert' : 'acceptAlert'
            code += `.${answer}()\n`
        break
        case stepTypes.WINDOW_SET_COOR:
            code += `.setWindowPosition(${form.x},${form.y})\n`
        break
        case stepTypes.WINDOW_SET_SIZE:
            code += `.setWindowSize(${form.width},${form.height})\n`
        break
        case stepTypes.BROWSER_ASSERT_TITLE:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.title()${sign}.${comparator}("${form.text}")\n`
        break
        case stepTypes.BROWSER_ASSERT_URL:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.url()${sign}.${comparator}("${form.text}")\n`
        break
        case stepTypes.PROMPT_ASSERT:
            code += `.assert.ok(browser.getAlertText == "${form.text}")\n`
        break
        case stepTypes.WINDOW_ASSERT_COOR:
            code += `.assert.ok(browser.getWindowPosition().x == "${form.x}" && browser.getWindowPosition().y == "${form.y}")\n`
        break
        case stepTypes.WINDOW_ASSERT_SIZE:
            code += `.assert.ok(browser.getWindowSize().width == "${form.width}" && browser.getWindowSize().height == "${form.height}")\n`
        break
        case stepTypes.ELEM_CLICK:
            code += `.css(${cssSelector}).click()`
        break
        case stepTypes.ELEM_SET_VALUE:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.css(${cssSelector}).setValue(${form.value})`
        break
        case stepTypes.ELEM_ASSERT_STATE:
            estype = getElementState(form.estype)
            sign = getSign(form.sign)
            code += `.css(${cssSelector})${sign}${estype}`
        break
        case stepTypes.ELEM_ASSERT_VALUE:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.css(${cssSelector})${sign}.${comparator}(${form.text})`
        break
        case stepTypes.ELEM_ASSERT_TEXT:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.css(${cssSelector})${sign}.${comparator}(${form.text})`
        break
        case stepTypes.ELEM_ASSERT_TAG_NAME:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.css(${cssSelector})${sign}.${comparator}(${form.text})`
        break
        case stepTypes.ELEM_ASSERT_COOR:
            code += `.assert.ok(browser.css(${cssSelector}).getLocation().x == "${form.x}" && browser.css(${cssSelector}).getLocation().y == "${form.y}")\n`
        break
        case stepTypes.ELEM_ASSERT_SIZE:
            code += `.assert.ok(browser.getElementSize().width == "${form.width}" && browser.getElementSize().height == "${form.height}")\n`
        break
        case stepTypes.ELEM_ASSERT_HTML_ATTR:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.css(${cssSelector})${sign}.${comparator}(${form.text})`
        break
        case stepTypes.ELEM_ASSERT_CSS_PROP:
            comparator = getComparator(form.comparator)
            sign = getSign(form.sign)
            code += `.css(${cssSelector})${sign}.${comparator}(${form.text})`
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
        case IS_DISABLED:
            return ''
        case IS_FOCUSED:
            return ''
        case IS_PRESENT:
            return ''
        case IS_SELECTED:
            return ''
        case IS_VISIBLE:
            return ''                                                    
    }
}

module.exports = {
    getGeneratedCode,
}