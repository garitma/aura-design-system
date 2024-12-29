import Section from "@aura-design/system/section";
import Separator from "@aura-design/system/separator";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import {Content} from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

type FooterProps = {
  footer: Content.FooterDocument;
};

const Footer = ({ footer }: FooterProps): JSX.Element => {
  const iconsResolver = {
    twitter: TwitterLogoIcon,
    instagram: InstagramLogoIcon,
    linkedin: LinkedInLogoIcon,
  };

  return (
    <footer className="bg-dark-blue text-white">
      <Section passDiv>
        {footer.data.slices.length > 0 ? (
          <Grid col="four" className="mt-2">
            {footer.data.slices.map((item) => {
              switch (item.variation) {
                case "socialMedia":
                  return (
                    <div key={item.id}>
                      <PrismicRichText field={item.primary.label} />
                      {item.items.length > 0 ? (
                        <ul className="nav-list">
                          {item.items.map((sub_item) => {
                            const SocialIcon = sub_item.icon
                              ? iconsResolver[sub_item.icon]
                              : null;
                            return (
                              <li
                                className="my-1"
                                key={JSON.stringify(sub_item)}
                              >
                                <PrismicNextLink
                                  field={sub_item.label_link}
                                  passHref
                                  legacyBehavior
                                >
                                  <Button mode="link">
                                    {SocialIcon ? (
                                      <SocialIcon className="icon text-white text-2xl" />
                                    ) : null}
                                  </Button>
                                </PrismicNextLink>
                              </li>
                            );
                          })}
                        </ul>
                      ) : null}
                    </div>
                  );
                default:
                  return (
                    <div key={item.id}>
                      <PrismicRichText field={item.primary.label} />
                      {item.items.length > 0 ? (
                        <ul>
                          {item.items.map((sub_item) => (
                            <li className="my-1" key={JSON.stringify(sub_item)}>
                              <PrismicNextLink
                                field={sub_item.label_link}
                                className="hover:underline"
                              >
                                {sub_item.label}
                              </PrismicNextLink>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
              }
            })}
          </Grid>
        ) : null}
      </Section>
      <Separator className="bg-white"/>
      <Section  className="text-center mb-1 p-1" passDiv>
        {footer.data.copyright ? (
          <PrismicRichText field={footer.data.copyright} />
        ) : null}
      </Section>
    </footer>
  );
};

export default Footer;
