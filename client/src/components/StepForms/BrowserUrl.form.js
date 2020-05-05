import React from 'react'
import PropTypes from 'prop-types'
import { CHANGE_URL } from 'constants/StepTypes/BrowserUrlForm.types'
import { CURRENT_FORM_REDUCER } from 'constants/TestTypes/StepForm.types'

BrowserUrlForm.propTypes = {
}

export default function BrowserUrlForm(props) {

    const {reducer, selectedStep} = props

    console.log(selectedStep);
    
    let ss = selectedStep[0]

    let url = ss.form.link

    function handleChange(e){
        reducer({type:CURRENT_FORM_REDUCER, action: CHANGE_URL, params: {url:e.target.value}})
    }

	return (
		<div className="input-group">
            <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">http://</span>
                </div>
                <input onChange={handleChange} value={url} type="text" className="form-control" placeholder="Playback base URL" aria-label="Username" aria-describedby="basic-addon1" />
            </div>	
        </div>
	)
}

