
import { clsx } from 'clsx';
import NextLink from 'next/link';
import Image from 'next/image';
import { WalletComponents } from "./WalletComponents";


export function NavbarLink({
  href,
  children,
  target,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  target?: string;
  ariaLabel?: string;
}) {
  return (
    <NextLink
      href={href}
      className="font-robotoMono px-0 text-center text-base font-normal  no-underline"
      target={target}
      aria-label={ariaLabel}
    >
      {children}
    </NextLink>
  );
}

export function NavbarTitle() {
  return (
    <div className="flex h-8 items-center justify-start gap-4">
      <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
        <svg
          width={31}
          height={29}
          viewBox="0 0 31 29"
          xmlns="http://www.w3.org/2000/svg"

        >
          <path
            d="M2.147 22.526l7.45-3.563a13.726 13.726 0 0111.816.008l7.438 3.571a15.315 15.315 0 01-6.09 5.572l-4.05-1.953a7.39 7.39 0 00-6.372-.01l-4.1 1.959a15.313 15.313 0 01-6.092-5.584z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.53 2.227v2.77c.001 2.216-1.305 4.242-3.373 5.232L.295 12.08A14.34 14.34 0 000 14.976c0 2.022.421 3.95 1.184 5.707l7.012-3.362c3.777-1.81 6.38-5.216 7.103-9.119a.203.203 0 01.201-.163c.1 0 .185.069.202.163.722 3.903 3.325 7.309 7.103 9.12l7.012 3.36A14.29 14.29 0 0031 14.978c0-.992-.102-1.961-.295-2.899l-3.862-1.849c-2.068-.99-3.375-3.016-3.374-5.232v-2.77A15.935 15.935 0 0015.5.114c-2.914 0-5.64.772-7.97 2.113z"
            fill="currentColor"
          />
        </svg>
      </NextLink>
      <NextLink
        href="/"
        passHref
        className="font-robotoMono text-center text-xl font-medium  no-underline"
        aria-label="build-onchain-apps Github repository"
      >
        Zeneca Pay
      </NextLink>
      <svg
        width={50}
        height={50}
        viewBox="0 0 416 110"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M110.034 55C110.034 85.3756 85.359 110 54.921 110C26.0432 110 2.35281 87.8354 0 59.6232H72.8467V50.3768H0C2.35281 22.1646 26.0432 0 54.921 0C85.359 0 110.034 24.6243 110.034 55ZM314.358 100.036C333.455 100.036 345.98 89.7462 345.98 74.2502C345.98 59.8699 336.555 53.0516 322.295 50.6962L309.646 48.5887C299.974 46.9772 293.525 42.7622 293.525 33.4646C293.525 24.043 300.718 16.8529 314.358 16.8529C327.627 16.8529 334.447 23.5472 335.191 33.0927H344.74C343.996 20.448 334.323 9.16685 314.482 9.16685C294.889 9.16685 284.101 20.2 284.101 33.8365C284.101 48.3408 293.897 55.0351 307.29 57.2665L320.063 59.25C330.727 61.1095 336.679 65.4484 336.679 74.6221C336.679 85.4073 327.875 92.3495 314.482 92.3495C300.594 92.3495 291.913 85.6553 291.169 74.2502H281.745C282.489 89.1264 293.897 100.036 314.358 100.036ZM173.574 98.3H138.852V11.0264H172.334C187.091 11.0264 197.383 19.7042 197.383 33.5886C197.383 43.63 191.679 50.3243 182.503 52.5557V52.9276C193.415 55.0351 200.111 62.4732 200.111 74.1262C200.111 89.1264 189.075 98.3 173.574 98.3ZM171.094 49.3326C181.635 49.3326 188.083 43.63 188.083 34.7043V33.4646C188.083 24.5389 181.635 18.9603 171.094 18.9603H148.153V49.3326H171.094ZM172.21 90.366C183.743 90.366 190.811 84.0437 190.811 74.3741V73.1345C190.811 63.093 183.619 57.0186 172.086 57.0186H148.153V90.366H172.21ZM275.216 98.3H265.295L257.855 74.6221H223.133L215.693 98.3H206.268L234.914 11.0264H246.198L275.216 98.3ZM240.99 20.5719H240.246L225.613 66.8121H255.499L240.99 20.5719ZM359.949 98.3V11.0264H416V19.0843H369.25V49.0846H412.28V57.0186H369.25V90.2421H416V98.3H359.949Z"
          fill="#0052ff"
        />
      </svg>
      <p className="font-robotoMono text-center font-medium  no-underline text-[#0052ff]">
        Onchain Summer
      </p>
    </div>
  );
}

function Navbar() {
  return (
    <nav
      className={clsx(
        'flex flex-1 flex-grow items-center justify-between',
        ' bg-opacity-10 p-4',
      )}
    >
      <div className="flex h-8 grow items-center justify-between gap-4">
        <NavbarTitle />
        <div className="flex items-center justify-start gap-8">
          <ul className="hidden items-center justify-start gap-8 md:flex">

            {/* <li className="flex">
              <NavigationMenu.Root className="relative">
                <NavigationMenu.List className={clsx('flex flex-row space-x-2')}>
                  <NavigationMenu.Item>
                    <NavigationMenu.Trigger className="group flex h-16 items-center justify-start gap-1">
                      <span className="font-robotoMono text-center text-base font-normal ">
                        Experiences
                      </span>
                      <ChevronDownIcon
                        className="transform transition duration-200 ease-in-out group-data-[state=open]:rotate-180"
                        width="16"
                        height="16"
                      />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content
                      className={clsx(
                        'h-38 inline-flex w-48 flex-col items-start justify-start gap-6',
                        'rounded-lg p-6 shadow backdrop-blur-2xl',
                      )}
                    >
                      <Experiences />
                    </NavigationMenu.Content>
                  </NavigationMenu.Item>
                </NavigationMenu.List>
                <NavigationMenu.Viewport
                  className={clsx(
                    'absolute flex justify-center',
                    'left-[-20%] top-[100%] w-[140%]',
                  )}
                />
              </NavigationMenu.Root>

            </li> */}
            {/* <NextLink
              href="/payment-link"
              passHref
              className="text-center font-medium  no-underline"
              aria-label="Checkout"
            >
              Products
            </NextLink> */}
          </ul>
          <WalletComponents />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;