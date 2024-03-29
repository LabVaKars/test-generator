const PREFIX = 'STEP_TYPE'

module.exports = {
    SELECT_ELEM:              `${PREFIX}:SELECT_ELEM`,
    EMPTY_STEP:               `${PREFIX}:EMPTY_STEP`,
    BROWSER_URL:              `${PREFIX}:BROWSER_URL`,
    BROWSER_ACTION:           `${PREFIX}:BROWSER_ACTION`,
    BROWSER_ASSERT_URL:       `${PREFIX}:BROWSER_ASSERT_URL`,
    BROWSER_ASSERT_TITLE:     `${PREFIX}:BROWSER_ASSERT_TITLE`,
    COOKIE_DELETE:            `${PREFIX}:COOKIE_DELETE`,
    COOKIE_UPDATE:            `${PREFIX}:COOKIE_UPDATE`,
    COOKIE_ASSERT:            `${PREFIX}:COOKIE_ASSERT`,
    PROMPT_SET_VALUE:         `${PREFIX}:PROMPT_SET_VALUE`,
    PROMPT_ACTION:            `${PREFIX}:PROMPT_ACTION`,
    PROMPT_ASSERT:            `${PREFIX}:PROMPT_ASSERT`,
    EMPTY_ELEM_STEP:          `${PREFIX}:EMPTY_ELEM_STEP`,
    ELEM_CLICK:               `${PREFIX}:ELEM_CLICK`,
    ELEM_SET_VALUE:           `${PREFIX}:ELEM_SET_VALUE`,
    ELEM_ASSERT_STATE:        `${PREFIX}:ELEM_ASSERT_STATE`,
    ELEM_ASSERT_HTML_ATTR:    `${PREFIX}:ELEM_ASSERT_HTML_ATTR`,
    ELEM_ASSERT_CSS_PROP:     `${PREFIX}:ELEM_ASSERT_CSS_PROP`,
    ELEM_ASSERT_VALUE:        `${PREFIX}:ELEM_ASSERT_VALUE`,
    ELEM_ASSERT_TEXT:         `${PREFIX}:ELEM_ASSERT_TEXT`,
    ELEM_ASSERT_TAG_NAME:     `${PREFIX}:ELEM_ASSERT_TAG_NAME`,
    ELEM_ASSERT_COOR:         `${PREFIX}:ELEM_ASSERT_COOR`,
    ELEM_ASSERT_SIZE:         `${PREFIX}:ELEM_ASSERT_SIZE`,
    WINDOW_ASSERT_COOR:       `${PREFIX}:WINDOW_ASSERT_COOR`,
    WINDOW_ASSERT_SIZE:       `${PREFIX}:WINDOW_ASSERT_SIZE`,
    WINDOW_SET_COOR:          `${PREFIX}:WINDOW_SET_COOR`,
    WINDOW_SET_SIZE:          `${PREFIX}:WINDOW_SET_SIZE`,
}