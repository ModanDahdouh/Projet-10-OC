import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
    const { data } = useData();
    const [index, setIndex] = useState(0);
    // trie les éléments de l'array (stocké dans data) par ordre décroissant de date
    const byDateDesc = data?.focus.sort((evtA, evtB) =>
        new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
    );
    // Ajout de -1 sur byDateDesc.length pour que la condition s'applique une fois sur la dernière image du slider
    const nextCard = () => {
        if (byDateDesc && byDateDesc.length > 0) {
            setTimeout(
                () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
                5000
            );
        }
    };
    useEffect(() => {
        nextCard();
    });
    return (
        <div className="SlideCardList">
            {byDateDesc?.map((event, idx) => (
                <div key={event.title}>
                    <div
                        className={`SlideCard SlideCard--${
                            index === idx ? "display" : "hide"
                        }`}
                    >
                        <img src={event.cover} alt="forum" />
                        <div className="SlideCard__descriptionContainer">
                            <div className="SlideCard__description">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div>{getMonth(new Date(event.date))}</div>
                            </div>
                        </div>
                    </div>
                    <div className="SlideCard__paginationContainer">
                        <div className="SlideCard__pagination">
                            {byDateDesc.map((_, radioIdx) => (
                                <input
                                    key={`${_.title}`} // changement key pour evite la dupliquation
                                    type="radio"
                                    name="radio-button"
                                    checked={index === radioIdx} // ajoute index a la place idx pour les dote
                                    readOnly
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;
