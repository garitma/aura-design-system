import Section from "@aura-design/system/section";
import Separator from "@aura-design/system/separator";
import Grid from "@aura-design/system/grid";
import Button from "@aura-design/system/button";
import * as prismic from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import {
  TwitterLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";

type FooterProps = {
  footer: prismic.Content.FooterDocument;
};

const Footer = ({ footer }: FooterProps): JSX.Element => {
  const iconsResolver = {
    twitter: TwitterLogoIcon,
    instagram: InstagramLogoIcon,
    linkedin: LinkedInLogoIcon,
  };

  return (
    <footer>
      <Section passDiv>
        <div className="text-center">
          <b className="h3">LUNALANDIA</b>
        </div>
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
                                      <SocialIcon className="icon" />
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
      <Separator />
      <Section space="p0" className="text-center" passDiv>
        {footer.data.copyright ? (
          <PrismicRichText field={footer.data.copyright} />
        ) : null}
      </Section>
    </footer>
  );
};

export default Footer;
