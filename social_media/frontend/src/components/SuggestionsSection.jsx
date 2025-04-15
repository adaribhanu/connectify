import React from 'react'
import BirthdaysList from './BirthdaysList'
import SuggestionsList from './SuggestionList'
import RemaindersSection from './RemaindersList'
function SuggestionsSection() {
  return (
    <div className="w-72 bg-[#EBEBEB] space-y-4">
    <SuggestionsList />
    <RemaindersSection/>
    <BirthdaysList />
  </div>
  
  )
}
export default SuggestionsSection