import update from 'immutability-helper'
import { ADD_PROJECT, DELETE_PROJECT, TOGGLE_SELECT_PROJECT, CHANGE_NAME, CHANGE_BASE_URL, SAVE_CHANGES, INIT_PROJECTS } from 'constants/ProjectTypes/Project.types'


const handlers = {
    [INIT_PROJECTS]: (state, {projects}) => {
        state = update(state, {projects: {$set: projects}})
        return state
    },
    [ADD_PROJECT]: (state, {id}) => {
        return update(state, {projects: {$push: [{
            id,
            serverId: null,
            name: "",
            baseUrl: "",
            groups: [],
            isSelected: false
        }]}})
    },
    [DELETE_PROJECT]: (state, {id}) => {
        let index = state.projects.findIndex((project) => {
            return project.id == id;
        })
        return update(state, {projects: {$splice: [
            [index, 1]
        ]}});
    },
    [TOGGLE_SELECT_PROJECT]: (state, {id, multiSelect}) => {
        let index = state.projects.findIndex((project) => {
            return project.id == id;
        })
        let newValue = !state.projects[index].isSelected
        let projects
        if(!multiSelect){
            projects = state.projects.map((p) => {
                return {...p, isSelected: false}
            })
            
            projects[index].isSelected = newValue;
        } else {
            projects = state.projects.slice(0)
            projects[index].isSelected = newValue;
        }
        return update(state, {projects: {$set: projects}})
    },
    [CHANGE_NAME]: (state, {id, value}) => {
        let index = state.projects.findIndex((project) => {
            return project.id == id;
        })
        let newValue = {name: value}
        return update(state, {projects: {[index]: {$merge: newValue}}})
    },
    [CHANGE_BASE_URL]: (state, {id, value}) => {
        let index = state.projects.findIndex((project) => {
            return project.id == id;
        })
        let newValue = {baseUrl: value}
        return update(state, {projects: {[index]: {$merge: newValue}}})
    },
    [SAVE_CHANGES]: (state,{}) => {
        return update(state, {$merge: {hasChanges: false}})
    },
    DEFAULT: state => state,
}

const ProjectFormReducer = (state, action) => {
    if(state.hasChanges == false && 
        action.type != TOGGLE_SELECT_PROJECT &&
        action.type != SAVE_CHANGES &&
        action.type != INIT_PROJECTS
    ){
        state = update(state, {$merge: {hasChanges: true}})
    }
    let handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
}

export default ProjectFormReducer