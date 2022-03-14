import React from 'react';
import './Wklejka.css'
function Wklejka () {
    return (
        <div className='outer-box'>
            <form action="#" method='post'>
                <div className='input-item-top'>
                    <label for="autor">Autor</label><br/>
                    <input type="text" id="autor" name="autor"/>
                </div>
                <div className='input-item-top'>
                    <label for="tytul">Tytuł</label><br/>
                    <input type="text" id="tytul" name="tytul"/>
                </div>
                <div className='input-item-top'>
                <label for="kolorowanie">Kolorowanie</label><br/>
                <input type="text" id="kolorowanie" name="kolorowanie"/><br/>
                </div>
                <div className='wklejka'>
                <label for="wklejka">Twoja wklejka - Tutaj dodaj swoją wklejkę</label><br/>
                <textarea id="wklejka" name="wklejka" rows='30' cols='137'/>
                </div>
                <div>
                <label for="private">
                    <input type="checkbox" id="private" name="private"/>
                    Prywatna - Wklejki prywatne nie będą pokazywane publicznie
                </label><br/>
                </div>
                <div>
                <label for='expire'>Usuń po - kiedy twoja wklejka ma wygasnąć?</label><br/>
                <select name='expire' id='expire'>
                    <option value='instatnt'>spal po przeczytaniu!</option>
                    <option value='never'>nigdy</option>
                    <option value='hour'>1 godzina</option>
                    <option value='day'>1 dzien</option>
                    <option value='week'>1 tydzień</option>
                    <option value='month'>1 miesiąc</option>
                    <option value='year'>1 rok</option>
                </select><br/>
                </div>
                <div className='form-sub'>
                <button type='submit' name='submit' value='submit'>Utwórz</button>
                </div>
            </form>

        </div>
    )
}

export default Wklejka;