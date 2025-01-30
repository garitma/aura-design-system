import Input from "@/components/ui/Input";

export default async function DocsLayout({ children }) {
  return (
    <div className="smush h-full">
      <div className="md:flex flex-row gap-1 h-full">
        <aside className="md:w-[250px] md:h-full pad">
          <ul>
            <li>
              <a className="font-medium" href="/docs/app/getting-started">
                Getting Started
              </a>
              <div className="mt-1">
                <div className="relative">
                  <ul className="px-0.5 last-of-type:mb-0 mb-8">
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Installation
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Project Structure
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Layouts and Pages
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Images and Fonts
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        CSS
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Fetching Data
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Updating Data
                      </a>
                    </li>
                    <li>
                      <a className=" relative flex w-full items-center justify-between rounded-md py-0.5 pl-1 text-left ">
                        Error Handling
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </aside>
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
