const assert = require('assert');
const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('calculatorapp', () => {
  const provider = anchor.Provider.local();
  anchor.setProvider(provider);

  //creates account for calculator
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Calculatorapp;

  it('Creates a calculator', async () => {
    await program.rpc.create("Hello im a calculator",{
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    //console.log(account.data);
    assert.ok(account.greeting === "Hello im a calculator");
    let calculator_addr = calculator;
  })

  it("Adds two numbers", async function() {
    //const calculator = _calculator;
    
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    });

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Hello im a calculator");
  });

  it('Multiplies two numbers', async function() {
    //const calculator = _calculator;

    await program.rpc.multiply(new anchor.BN(2), new anchor.BN(2),{
      accounts: {
        calculator: calculator.publicKey,
      },
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(4)));
    assert.ok(account.greeting === "Hello im a calculator");
  })

  it('Subtracts two numbers', async function() {
    //const calculator = _calculator;

    await program.rpc.subtract(new anchor.BN(25), new anchor.BN(10),{
      accounts: {
        calculator: calculator.publicKey,
      },
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(15)));
    assert.ok(account.greeting === "Hello im a calculator");
  });

  it('Divides two numbers', async function() {
    //const calculator = _calculator;

    await program.rpc.divide(new anchor.BN(15), new anchor.BN(3),{
      accounts: {
        calculator: calculator.publicKey,
      },
    })

    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Hello im a calculator");
  });
})