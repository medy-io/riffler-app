Feature: Test the submit button to ensure a valid deck can be submitted
    As a user I want to test whether I can submit my deck

    Background:
        Given (Preconditions) Describes an initial context of a system / scene of the scenario. The purpose of Given, is to put the system into a known state

        # example
        Scenario: Given example
        Given Mickey and Minnie have started a game
        And I am logged in
        And Joe has a balance of £42

        Scenario: When example
        When is used to describe an event, or an action. Can be triggered by person or machine. Try to only have one When step per scenario
        When Guess a word
        # Given I open the web app

        Scenario: Then example
        Then is used to describe an expected outcome or result. This step should have an ASSERTATION to compare outcomes, what the system does vs. what the steps say it does
        Then I click "Submit"

        Scenario: And, But
        And is filler for something like chaining Given
        But is similar

        # final example
        Scenario: Final Example
            Given one thing                     # precondition
            And another thing                   # precondition
            And yet another thing               # precondition
            When I open my eyes                 # action
            Then I should see something         # potcome or result to assert against the steps
            But I shouldn't see something else  # additional assert to then