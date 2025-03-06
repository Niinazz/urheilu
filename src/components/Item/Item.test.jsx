import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Item from './Item.jsx'

describe('Item', () => {
  test('Komponentti renderöityy merkinnän tiedoilla', () => {
    // Määritellään merkinnän tiedot.
    const data = {
      id: "1",
      type: "Juoksu",
      duration: 60,
      sportDate: "March 4, 2025 at 12:45:00 AM UTC+2", // Muutetaan tähän sportDate
    }

    render(<Item data={data} />, { wrapper: BrowserRouter })

    // Määritetään lokaaliasetukset.
    const locale = "fi-FI"

    // Tyyppi
    const typeElement = screen.getByText(data.type)
    expect(typeElement).toBeInTheDocument()

    // Urheilupäivä
    const sportDate = new Date(data.sportDate).toLocaleDateString(locale)  // Käytetään sportDate
    const dateElement = screen.getByText(sportDate)  // Muutetaan paymentDate -> sportDate
    expect(dateElement).toBeInTheDocument() 

    // Kesto
    const durationElement = screen.getByText(`${data.duration} minuuttia`)
    expect(durationElement).toBeInTheDocument()
  })
})

