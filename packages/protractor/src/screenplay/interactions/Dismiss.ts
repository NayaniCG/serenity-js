import { AnswersQuestions, Interaction, Question, UsesAbilities } from '@serenity-js/core';
import { formatted } from '@serenity-js/core/lib/io';
import { AlertPromise } from 'selenium-webdriver';

/**
 * @desc
 *  Instructs the {@link @serenity-js/core/lib/screenplay/actor~Actor} to dismiss
 *  a {@link ModalDialog}.
 *
 * @example <caption>Widget</caption>
 *  <button
 *      data-test="trigger"
 *      onclick="alert('hello!')">Trigger Alert</button>
 *
 * @example <caption>Usage</caption>
 *  import { actorCalled } from '@serenity-js/core';
 *  import { BrowseTheWeb, Click, Dismiss, ModalDialog, Target } from '@serenity-js/protractor';
 *  import { browser, by } from 'protractor';
 *
 *  class Widget {
 *      static trigger = Target.the('trigger button')
 *          .located(by.css('[data-test="trigger"]'));
 *  }
 *
 *  actorCalled('Nick')
 *      .whoCan(BrowseTheWeb.using(protractor.browser))
 *      .attemptsTo(
 *          Click.on(Widget.trigger),
 *          Dismiss.the(ModalDialog.window()),
 *      );
 */
export class Dismiss extends Interaction {

    /**
     * @desc
     *  Instantiates this {@link @serenity-js/core/lib/screenplay~Interaction}
     *  with a {@link ModalDialog.window} the {@link @serenity-js/core/lib/screenplay/actor~Actor}
     *  will dismiss.
     *
     * @param {@serenity-js/core/lib/screenplay~Question<AlertPromise> | AlertPromise} modalDialogWindow
     * @returns {@serenity-js/core/lib/screenplay~Interaction}
     *
     * @see {@link @serenity-js/core/lib/screenplay~Question}
     */
    static the(modalDialogWindow: Question<AlertPromise> | AlertPromise): Interaction {
        return new Dismiss(modalDialogWindow);
    }

    /**
     * @param {@serenity-js/core/lib/screenplay~Question<AlertPromise> | AlertPromise} modalDialogWindow
     */
    constructor(private readonly modalDialogWindow: Question<AlertPromise> | AlertPromise) {
        super();
    }

    /**
     * @desc
     *  Makes the provided {@link @serenity-js/core/lib/screenplay/actor~Actor}
     *  perform this {@link @serenity-js/core/lib/screenplay~Interaction}.
     *
     * @param {UsesAbilities & AnswersQuestions} actor
     * @returns {Promise<void>}
     *
     * @see {@link @serenity-js/core/lib/screenplay/actor~Actor}
     * @see {@link @serenity-js/core/lib/screenplay/actor~UsesAbilities}
     * @see {@link @serenity-js/core/lib/screenplay/actor~AnswersQuestions}
     */
    performAs(actor: UsesAbilities & AnswersQuestions): PromiseLike<void> {
        return actor.answer(this.modalDialogWindow)
            .then(alert => alert.dismiss());
    }

    /**
     * @desc
     *  Generates a description to be used when reporting this {@link @serenity-js/core/lib/screenplay~Activity}.
     *
     * @returns {string}
     */
    toString(): string {
        return formatted `#actor dismisses ${ this.modalDialogWindow }`;
    }
}
