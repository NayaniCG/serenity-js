import { TableDefinition } from 'cucumber';

export = function() {
    this.Given(/^.*step (?:.*) passes$/, function() {
        return void 0;
    });

    this.Given(/^.*step (?:.*) fails$/, function() {
        throw new Error(`Something's wrong`);
    });

    this.Given(/^.*step (?:.*) marked as (pending|skipped)/, function(result: string) {
        return result;
    });

    this.Given(/^.*step (?:.*) receives a table:$/, function(data: TableDefinition) {
        return void 0;
    });

    this.Given(/^.*step (?:.*) receives a doc string:$/, function(docstring: string) {
        return void 0;
    });

    this.Given(/^.*step times out$/,  { timeout: 100 }, function(done: (error: Error, pending: string) => void) {
        setTimeout(done, 1000);
    });
};
