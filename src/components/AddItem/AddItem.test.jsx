import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AddItem from './AddItem.jsx'

describe('AddItem', () => {
  test('Lisäyslomake lähettää tiedot, kun vaadittavat kentät on täytetty', async () => {

    // Alustetaan testauskirjaston käyttäjäinteraktiot.
    const user = userEvent.setup()

    // Muodostetaan kulutyyppi-lista.
    const typelist = ['Juoksu','Uinti','Kuntosali']

    // Lomakkeelle syötettävät tiedot.
    const formdata = {
      type: typelist[1],     // urheilutyyppi-listan toinen alkio
      duration: 55,
      sportDate: '2023-11-01',
    }

    // Muodostetaan lomakekäsittelijää simuloiva funktio.
    // Testin kannalta riittää, että nähdään kuinka monta
    // kertaa funktiota kutsuttiin ja millä arvolla.
    const handleItemSubmit = vi.fn(() => true)

    // Renderöidään komponentti.
    render(<AddItem onItemSubmit={handleItemSubmit} 
                    typelist={typelist} />, {wrapper: BrowserRouter} )
    
    // Valitaan urheilutyyppi ja tarkistetaan, että
    //  - listasta on valittu oikea valinta ja 
    //  - lisäysnappi on disabloitu.
    await user.selectOptions(screen.getByLabelText('Urheilutyyppi'), formdata.type)
    expect(screen.getByRole('option', {name: formdata.type}).selected).toBe(true)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)

    // Syötetään kesto ja tarkistetaan, että
    //  - kentän arvo on sama kuin syötetty arvo ja 
    //  - lisäysnappi on disabloitu.
    await user.type(screen.getByLabelText('duration'), formdata.amount.toString())
    expect(screen.getByLabelText('duration')).toHaveValue(formdata.amount)
    expect(screen.getByRole('button', {name: 'LISÄÄ'}).disabled).toBe(true)
    


    // Painetaan lisäysnappia ja tarkistetaan, että
    //  - handleItemSubmit-funktiota on kutsuttu vain kerran ja
    //  - funktion parametrina saama olio sisältää samat tiedot
    //    kuin mitä lomakkeelle syötettiin.
    await user.click(screen.getByRole('button', {name: 'LISÄÄ'}))
    expect(handleItemSubmit).toHaveBeenCalledTimes(1);
    const submittedItem = handleItemSubmit.mock.lastCall.shift()
    expect(submittedItem).toMatchObject(formdata)

  })
})
