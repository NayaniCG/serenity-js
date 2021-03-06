import 'mocha';

import { expect } from '@integration/testing-tools';
import { Ensure, equals } from '@serenity-js/assertions';
import { actorCalled, engage } from '@serenity-js/core';
import { by } from 'protractor';
import { Navigate, Select, Selected, Target, Text } from '../../../src';
import { pageFromTemplate } from '../../fixtures';
import { UIActors } from '../../UIActors';

describe('Select', () => {

    const pageWithSingleSelect = pageFromTemplate(`
            <html>
                <body>
                <form>
                    <fieldset name='options'>
                        <legend>Working with single option</legend>
                        <label for='single-option-select'>
                            Country
                            <select id='single-option-select'>
                                <option value='UK'>United Kingdom</option>
                                <option value='PL'>Poland</option>
                                <option value='DE'>Germany</option>
                                <option value='FR'>France</option>
                            </select>
                        </label>
                    </fieldset>
                    <p id='country-of-interest-code'>PL</p>
                    <p id='country-of-interest-name'>Poland</p>
                </form>
                </body>
            </html>
        `);

    class SingleSelectPage {
        static selector = Target.the('country selector').located(by.id('single-option-select'));
        static countryCode = Target.the('country code').located(by.id('country-of-interest-code'));
        static countryName = Target.the('country name').located(by.id('country-of-interest-name'));
    }

    const pageWithMultiSelect = pageFromTemplate(`
            <html>
                <body>
                <form>
                    <fieldset name='options'>
                        <legend>Working with options</legend>
                        <label for='multi-option-select'>
                            Country
                            <select multiple id='multi-option-select'>
                                <option value='UK'>United Kingdom</option>
                                <option value='PL'>Poland</option>
                                <option value='DE'>Germany</option>
                                <option value='FR'>France</option>
                            </select>
                        </label>
                    </fieldset>
                </form>
                <ul id='country-of-interest-codes'>
                    <li>PL</li>
                    <li>UK</li>
                </ul>
                <ul id='country-of-interest-names'>
                    <li>Poland</li>
                    <li>United Kingdom</li>
                </ul>
                <p id='another-country-of-interest-code'>DE</p>
                <p id='another-country-of-interest-name'>Germany</p>
                </body>
            </html>
        `);

    class MultiSelectPage {
        static selector = Target.the('country selector').located(by.id('multi-option-select'));
        static countryCodes = Target.all('country codes').located(by.css('#country-of-interest-codes li'));
        static countryNames = Target.all('country names').located(by.css('#country-of-interest-names li'));
        static anotherCountryCode = Target.the('another country code').located(by.css('#another-country-of-interest-code'));
        static anotherCountryName = Target.the('another country name').located(by.css('#another-country-of-interest-name'));
    }

    beforeEach(() => engage(new UIActors()));

    describe('when working with single-option selects', () => {

        describe('Select.value()', () => {

            /** @test {Select.value} */
            /** @test {Selected.valueOf} */
            it('should select a single option by its static value', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithSingleSelect),
                    Select.value('FR').from(SingleSelectPage.selector),
                    Ensure.that(Selected.valueOf(SingleSelectPage.selector), equals('FR'))
                ));

            /** @test {Select.value} */
            /** @test {Selected.valueOf} */
            it('should select a single option by its Answerable value', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithSingleSelect),
                    Select.value(Text.of(SingleSelectPage.countryCode)).from(SingleSelectPage.selector),
                    Ensure.that(Selected.valueOf(SingleSelectPage.selector), equals('PL'))
                ));
        });

        describe('Select.option()', () => {

            /** @test {Select.option} */
            /** @test {Selected.optionIn} */
            it('should select a single option by its static name', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithSingleSelect),
                    Select.option('France').from(SingleSelectPage.selector),
                    Ensure.that(Selected.optionIn(SingleSelectPage.selector), equals('France'))
                ));

            /** @test {Select.option} */
            /** @test {Selected.optionIn} */
            it('should select a single option by its Answerable name', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithSingleSelect),
                    Select.option(Text.of(SingleSelectPage.countryName)).from(SingleSelectPage.selector),
                    Ensure.that(Selected.optionIn(SingleSelectPage.selector), equals('Poland'))
                ));
        });
    });

    describe('when working with multi-option selects', () => {

        describe('Select.values()', () => {

            /** @test {Select.values} */
            /** @test {Selected.valuesOf} */
            it('should select multiple options by their static value', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.values('PL', 'DE').from(MultiSelectPage.selector),
                    Ensure.that(Selected.valuesOf(MultiSelectPage.selector), equals(['PL', 'DE']))
                ));

            /** @test {Select.values} */
            /** @test {Selected.valuesOf} */
            it('should select multiple options by their Answerable value', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.values(Text.ofAll(MultiSelectPage.countryCodes)).from(MultiSelectPage.selector),
                    Ensure.that(Selected.valuesOf(MultiSelectPage.selector), equals(['UK', 'PL']))
                ));

            /** @test {Select.values} */
            /** @test {Selected.valuesOf} */
            it('should concatenate option values from several Answerables', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.values(
                        Text.ofAll(MultiSelectPage.countryCodes),
                        Text.of(MultiSelectPage.anotherCountryCode),
                        'FR'
                    ).from(MultiSelectPage.selector),
                    Ensure.that(Selected.valuesOf(MultiSelectPage.selector), equals(['UK', 'PL', 'DE', 'FR']))
                ));

            /** @test {Select.values} */
            /** @test {Selected.valuesOf} */
            it('should concatenate option values from several static values', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.values('UK', 'PL').from(MultiSelectPage.selector),
                    Ensure.that(Selected.valuesOf(MultiSelectPage.selector), equals(['UK', 'PL']))
                ));
        });

        describe('Select.options()', () => {

            /** @test {Select.options} */
            /** @test {Selected.optionsIn} */
            it('should select multiple options by their static name', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.options(['Poland', 'France']).from(MultiSelectPage.selector),
                    Ensure.that(Selected.optionsIn(MultiSelectPage.selector), equals(['Poland', 'France']))));

            /** @test {Select.options} */
            /** @test {Selected.optionsIn} */
            it('should select multiple options by their Answerable name', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.options(Text.ofAll(MultiSelectPage.countryNames)).from(MultiSelectPage.selector),
                    Ensure.that(Selected.optionsIn(MultiSelectPage.selector), equals(['United Kingdom', 'Poland']))
                ));

            /** @test {Select.options} */
            /** @test {Selected.optionsIn} */
            it('should concatenate option values from several Answerables', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.options(
                        Text.ofAll(MultiSelectPage.countryNames),
                        Text.of(MultiSelectPage.anotherCountryName),
                        'France'
                    ).from(MultiSelectPage.selector),
                    Ensure.that(Selected.optionsIn(MultiSelectPage.selector), equals(['United Kingdom', 'Poland', 'Germany', 'France']))
                ));

            /** @test {Select.options} */
            /** @test {Selected.optionsIn} */
            it('should concatenate option values from several static values', () =>
                actorCalled('Nick').attemptsTo(
                    Navigate.to(pageWithMultiSelect),
                    Select.options(['Poland', 'Germany'], 'France').from(MultiSelectPage.selector),
                    Ensure.that(Selected.optionsIn(MultiSelectPage.selector), equals(['Poland', 'Germany', 'France']))
                ));
        });
    });

    describe('toString()', () => {

        /** @test {Select.value} */
        it('provides a sensible description of Select.value()', () => {
            expect(Select.value('FR').from(SingleSelectPage.selector).toString())
                .to.equal(`#actor selects value 'FR' from the country selector`);
        });

        /** @test {Selected.valueOf} */
        it('provides a sensible description of Selected.valueOf', () => {
            expect(Selected.valueOf(SingleSelectPage.selector).toString())
                .to.equal(`value selected in the country selector`);
        });

        /** @test {Select.option} */
        it('provides a sensible description of Select.option()', () => {
            expect(Select.option('France').from(SingleSelectPage.selector).toString())
                .to.equal(`#actor selects 'France' from the country selector`);
        });

        /** @test {Selected.optionIn} */
        it('provides a sensible description of Selected.optionIn()', () => {
            expect(Selected.optionIn(SingleSelectPage.selector).toString())
                .to.equal(`option selected in the country selector`);
        });

        /** @test {Select.values} */
        it('provides a sensible description of Select.values()', () => {
            expect(Select.values(['PL', 'DE'], 'FR').from(MultiSelectPage.selector).toString())
                .to.equal(`#actor selects values 'PL', 'DE' and 'FR' from the country selector`);
        });

        /** @test {Selected.valuesOf} */
        it('provides a sensible description of Select.valuesOf()', () => {
            expect(Selected.valuesOf(MultiSelectPage.selector).toString())
                .to.equal(`values selected in the country selector`);
        });

        /** @test {Select.options} */
        it('provides a sensible description of Select.options()', () => {
            expect(
                Select.options(
                    ['Poland', 'Germany' ],
                    'France',
                    Text.of(MultiSelectPage.anotherCountryName)
                ).from(MultiSelectPage.selector).toString()
            ).to.equal(`#actor selects 'Poland', 'Germany', 'France' and the text of the another country name from the country selector`);
        });

        /** @test {Selected.optionsIn} */
        it('provides a sensible description of Selected.optionsIn()', () => {
            expect(Selected.optionsIn(MultiSelectPage.selector).toString())
                .to.equal(`options selected in the country selector`);
        });
    });
});
