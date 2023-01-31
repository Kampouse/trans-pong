import { Contenter } from 'views/Menu/menu'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useState } from 'react'
import { useBallColor, useBackgroundColor, usePaddleColor } from 'Router/Router'
import { useAtom } from 'jotai'

export default function ColorOptions()
{
    const [ballColor, setBallColor] = useAtom(useBallColor)
    const [backgroundColor, setBackgroundColor] = useAtom(useBackgroundColor)
    const [paddleColor, setPaddleColor] = useAtom(usePaddleColor)
    var valueCss = "my-2"

  return (
    <div className="flex mt-[15%] min-h-screen w-full flex-col overflow-x-hidden pt-6 sm:h-fit">
      <div className="flex h-max w-screen flex-wrap justify-center lg:h-screen text-center font-Raleway text-2xl font-extrabold">
        <Contenter>
            <h2 className='text-4xl font-Raleway font-extrabold'>Color options</h2>
          <form className="flex flex-col gap-y-1">
            <div className={valueCss}>
                <h1 className='mb-1'> Ball color</h1>
                <ToggleButtonGroup exclusive value={ballColor} onChange={(evt, newColor) => {if (newColor !== null) setBallColor(newColor)}} color="primary">
                    <ToggleButton value="#ffffff" sx={{ fontWeight: 'bold' }}>White</ToggleButton>
                    <ToggleButton value="#ff0000" sx={{ fontWeight: 'bold' }}>Red</ToggleButton>
                    <ToggleButton value="#0000ff" sx={{ fontWeight: 'bold' }}>Blue</ToggleButton>
                    <ToggleButton value="#25853f" sx={{ fontWeight: 'bold' }}>Green</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={valueCss}>
                <h1 className='mb-1' >Background color</h1>
                <ToggleButtonGroup exclusive value={backgroundColor} onChange={(evt, newColor) => {if (newColor !== null) setBackgroundColor(newColor)}} color="primary">
                    <ToggleButton value="#000000" sx={{ fontWeight: 'bold' }}>Black</ToggleButton>
                    <ToggleButton value="#ff0000" sx={{ fontWeight: 'bold' }}>Red</ToggleButton>
                    <ToggleButton value="#0000ff" sx={{ fontWeight: 'bold' }}>Blue</ToggleButton>
                    <ToggleButton value="#25853f" sx={{ fontWeight: 'bold' }}>Green</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={valueCss}>
                <h1 className='mb-1'>Paddle color</h1>
                <ToggleButtonGroup exclusive value={paddleColor} onChange={(evt, newColor) => {if (newColor !== null) setPaddleColor(newColor)}} color="primary">
                    <ToggleButton value="#ffffff" sx={{ fontWeight: 'bold' }}>White</ToggleButton>
                    <ToggleButton value="#ff0000" sx={{ fontWeight: 'bold' }}>Red</ToggleButton>
                    <ToggleButton value="#0000ff" sx={{ fontWeight: 'bold' }}>Blue</ToggleButton>
                    <ToggleButton value="#25853f" sx={{ fontWeight: 'bold' }}>Green</ToggleButton>
                </ToggleButtonGroup>
            </div>

          </form>
        </Contenter>
      </div>
    </div>
  )
}
