import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
    new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });

const Form = ({ onSuccess, onError }) => {
    const [sending, setSending] = useState(false);
    const sendContact = useCallback(
        async (evt) => {
            evt.preventDefault();
            setSending(true);

            // Vérification des champs du formulaire pour bloquer l'éxécution si tous les champs ne sont pas remplis
            const form = evt.target;
            const fields = form.querySelectorAll(
                "input[name], textarea[name], select[name]"
            );
            const selectValue = fields[2].value; // Valeur du selecteur
            const selectField = form.querySelector(".Select"); // Champs du formulaire
            let isFormValid = true;

            fields.forEach((field) => {
                if (!field.value) {
                    isFormValid = false;
                    field.classList.add("field-empty"); // Ajoute la classe si le champ est vide
                } else {
                    field.classList.remove("field-empty"); // Supprime la classe si le champ a une valeur
                }
            });

            if (!selectValue) {
                // Si aucun choix dans le sélecteur alors on ajout la classe, sinon on l'enlève
                selectField.classList.add("field-empty");
            } else {
                selectField.classList.remove("field-empty");
            }

            if (!isFormValid) {
                return; // Arrête l'exécution si le formulaire n'est pas valide
            }

            setSending(true);
            // We try to call mockContactApi
            try {
                await mockContactApi();
                setSending(false);
                onSuccess(); // Ajout de onSuccess() au paramétrage de l'envoi réussi du formulaire pour déclencher l'évènement dans la modale
            } catch (err) {
                setSending(false);
                onError(err);
            }
        },
        [onSuccess, onError]
    );
    return (
        <form onSubmit={sendContact}>
            <div className="row">
                <div className="col">
                    <Field placeholder="" label="Nom" name="Nom" />{" "}
                    {/* Ajout des props name dans Field pour différencier les champs du formulaire */}
                    <Field placeholder="" label="Prénom" name="Prénom" />
                    <Select
                        selection={["Personel", "Entreprise"]}
                        onChange={() => null}
                        label="Personel / Entreprise"
                        type="large"
                        titleEmpty
                    />
                    <Field placeholder="" label="Email" />
                    <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                        {sending ? "En cours" : "Envoyer"}
                    </Button>
                </div>
                <div className="col">
                    <Field
                        placeholder="message"
                        label="Message"
                        type={FIELD_TYPES.TEXTAREA}
                    />
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    onError: PropTypes.func,
    onSuccess: PropTypes.func,
};

Form.defaultProps = {
    onError: () => null,
    onSuccess: () => null,
};

export default Form;
