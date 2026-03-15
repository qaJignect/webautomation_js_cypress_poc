export class StepLogger {
  static stepCount = 0; // keeps track of steps across the test

  static log(stepDescription) {
    this.stepCount += 1;
    cy.log(` STEP ${this.stepCount}: ${stepDescription}`);
  }

  static subStep(detail) {
    cy.log(` ${detail}`); // indented sub-step
  }

  static reset() {
    this.stepCount = 0; // resets before each test
  }
}
