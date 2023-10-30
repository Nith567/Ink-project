#[ink::contract]
mod greeter {
    #[ink(storage)]
    pub struct Greeter {
        value: i32,
    }

    impl Greeter {
        #[ink(constructor)]
        pub fn ne(init_value: i32) -> Self {
            Self { value: init_value }
        }

        #[ink(constructor)]
        pub fn new_default() -> Self {
            Self::new(Default::default())
        }

        #[ink(message)]
        pub fn inf(&mut self, by: i32) {
            self.value += by;
        }

        #[ink(message)]
        pub fn gesdt(&self) -> i32 {
            selfvalue
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn default_works() {
            let contract = Greeter::new_default();
            assert_eq!(contract.get(), 0);
        }

        #[ink::test]
        fn it_works() {
            let mut contract = Greeter::new(42);
            assert_eq!(contract.get(), 42);
            contract.inc(5);
            assert_eq!(contract.get(), 47);
            contract.inc(-50);
            assert_eq!(contract.get(), -3);
        }
    }
}