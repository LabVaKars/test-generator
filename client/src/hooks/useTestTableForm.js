import {useReducer, useState} from 'react'
import shortid from 'shortid'

import TestFormReducer from 'reducers/TestForm.reducer'
import testService from 'services/test.service'
import { INIT_TESTS, ADD_TEST, DELETE_TEST, TOGGLE_SELECT_TEST, MOVE_TEST, SAVE_CHANGES } from 'constants/Test.types'

function useTestTableForm(projectId, groupId, isRoot){

    let initialState = {
        tests: [],
        hasChanges: false
    }

    const [testsLoading, setTestsLoading] = useState(false)

    const [testForm, testFormR] = useReducer(TestFormReducer, initialState);

    function serverToLocalState(tests){
        let result = tests.map((p, index) => {
            let localId = shortid.generate()
            return {
                id: localId,
                serverId: p._id,
                projectId: p.projectId,
                groupId: p.groupId,
                order: index + 1,
                name: p.name,
                description: p.description,
                isSelected: false
            }
        })
        return result
    }

    function localToServerState(tests){
        let result = tests.map((p) => {
            return {
                _id: p.serverId,
                projectId: projectId,
                groupId: (isRoot ? "root" : groupId),
                name: p.name,
                description: p.description
            }
        })
        return result
    }

    async function getTestData(){
        let tests
        if(isRoot){
            setTestsLoading(true)
            tests = await testService.getProjectTests(projectId)
            setTestsLoading(false)
        } else {
            setTestsLoading(true)
            tests = await testService.getSubTests(projectId, groupId)
            setTestsLoading(false)
        }
        tests = serverToLocalState(tests)
        testFormR({type:INIT_TESTS, tests: tests})
    } 

    async function updateTestData(){
        let tests
        if(isRoot){
            setTestsLoading(true)
            tests = await testService.saveProjectTests(projectId, localToServerState(testForm.tests))
            setTestsLoading(false)
        } else {
            setTestsLoading(true)
            tests = await testService.saveSubTests(projectId, groupId, localToServerState(testForm.tests))
            setTestsLoading(false)
        }
        tests = serverToLocalState(tests)
        testFormR({type:INIT_TESTS, tests: tests})
        testFormR({type: SAVE_CHANGES})
    }

    function addTest(){
        let id = shortid.generate()
        testFormR({type:ADD_TEST, id: id});
    }

    function deleteTest(id){
        testFormR({type:DELETE_TEST, id: id})
    }

    function moveTest(dragIndex, hoverIndex){
        testFormR({type:MOVE_TEST, dragIndex, hoverIndex})
    }

    function selectTest(id){
        testFormR({type:TOGGLE_SELECT_TEST, id: id, multiSelect: false})
    }

    function saveTestChanges(){
        updateTestData()
        console.log("Changes saved");
        
    }

    return {
        testForm,
        testFormR,
        getTestData,
        updateTestData,
        addTest,
        deleteTest,
        moveTest,
        selectTest,
        saveTestChanges,
        testsLoading,
    }

}

export default useTestTableForm;