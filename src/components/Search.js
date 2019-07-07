import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faSearch)
class Search extends React.Component {
  state = {
    showingInput: false
  }
  render () {
    const { showingInput } = this.state
    return (
      <form>
        <FontAwesomeIcon icon='search' onClick={this.showingInput} />
        {
          showingInput &&
          <input type='text'/>
        }
      </form>
    )
  }
  showingInput = () => {
    this.setState({ showingInput:true })
  }
}

export default Search