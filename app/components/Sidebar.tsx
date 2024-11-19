"use client";
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { MdStadium } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
  localizedName?: string;
}

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Matches",
    url: "match",
    icon: MdStadium,
  },
];

export function AppSidebar() {
  const path = usePathname();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeagues() {
      try {
        const response = await fetch(
          "https://free-api-live-football-daeta.p.rapidapi.com/football-get-all-leagues",
          {
            method: "GET",
            headers: {
              "x-rapidapi-key":
                "73452e0975mshf95ab79883098b0p119f1djsnf35fc8d34115",
              Accept: "application/json",
              "x-rapidapi-host": "free-api-live-football-data.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch leagues");
        }

        const data = await response.json();
        setLeagues(data.response.leagues || []);
      } catch (err) {
        setError("Failed to fetch leagues. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLeagues();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading leagues...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={path === item.url}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenu>
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <div className="cursor-pointer flex justify-between ">
                          {" "}
                          League
                          <FaAngleDown />
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {leagues &&
                          leagues?.map((item) => (
                            <SidebarMenuSubItem key={item.id}>
                              <SidebarMenuButton
                                asChild
                                isActive={
                                  path ===
                                  item.localizedName?.replaceAll(" ", "")
                                }
                              >
                                <a
                                  href={`league/${item.id}`}
                                >
                                  {item.logo ? (
                                    <Image
                                      width={100}
                                      height={100}
                                      src={item.logo}
                                      alt={`${item.name} logo`}
                                      className=" w-3 h-3 object-contain"
                                    />
                                  ) : (
                                    <MdStadium size={20} />
                                  )}
                                  <span>
                                    {item.localizedName?.slice(0, 17) + "..."}
                                  </span>
                                </a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
