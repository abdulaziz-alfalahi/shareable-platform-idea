
import React from "react";
import { 
  UaeButton, 
  UaeCard, 
  UaeCardHeader, 
  UaeCardTitle, 
  UaeCardContent,
  UaeCardFooter,
  UaeBadge,
  UaeAlert,
  UaeAlertTitle,
  UaeAlertDescription,
  UaeDivider,
  UaeDecoContainer,
  UaeStatCard
} from "./";
import { 
  Settings, 
  User, 
  Bell, 
  Flag, 
  Star, 
  Info, 
  CheckCircle, 
  AlertTriangle,
  ChevronRight,
  Briefcase
} from "lucide-react";

const UaeComponentsShowcase = () => {
  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold font-serif text-emirati-deepBrown">UAE-Themed UI Components</h1>
      <p className="text-lg text-emirati-deepBrown/80">
        A showcase of UI components inspired by UAE heritage, landscapes, and culture.
      </p>

      {/* Button Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Buttons</h2>
        <UaeDivider variant="gradient" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Desert Variant</p>
            <UaeButton variant="desert">Desert Button</UaeButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Oasis Variant</p>
            <UaeButton variant="oasis">Oasis Button</UaeButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Flag Variant</p>
            <UaeButton variant="flag">Flag Button</UaeButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Gold Variant</p>
            <UaeButton variant="gold">Gold Button</UaeButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">With Icon</p>
            <UaeButton variant="oasis">
              <Settings className="h-4 w-4" />
              Settings
            </UaeButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">With Arabesque</p>
            <UaeButton variant="desert" decoration="arabesque">
              Arabesque Pattern
            </UaeButton>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">With Geometric</p>
            <UaeButton variant="desert" decoration="geometric">
              Geometric Pattern
            </UaeButton>
          </div>
        </div>
      </section>

      {/* Card Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Cards</h2>
        <UaeDivider variant="gradient" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UaeCard variant="desert">
            <UaeCardHeader>
              <UaeCardTitle>Desert Card</UaeCardTitle>
            </UaeCardHeader>
            <UaeCardContent>
              <p>A card inspired by UAE desert landscapes with sand-colored styling.</p>
            </UaeCardContent>
            <UaeCardFooter>
              <UaeButton variant="desert" size="sm">
                Learn More
                <ChevronRight className="h-4 w-4" />
              </UaeButton>
            </UaeCardFooter>
          </UaeCard>
          
          <UaeCard variant="oasis">
            <UaeCardHeader>
              <UaeCardTitle>Oasis Card</UaeCardTitle>
            </UaeCardHeader>
            <UaeCardContent>
              <p>A card inspired by UAE oases with green-colored styling.</p>
            </UaeCardContent>
            <UaeCardFooter>
              <UaeButton variant="oasis" size="sm">
                Learn More
                <ChevronRight className="h-4 w-4" />
              </UaeButton>
            </UaeCardFooter>
          </UaeCard>
          
          <UaeCard variant="flag" pattern="corners">
            <UaeCardHeader>
              <UaeCardTitle>Flag Card</UaeCardTitle>
            </UaeCardHeader>
            <UaeCardContent>
              <p>A card inspired by the UAE flag with red accents and corner decorations.</p>
            </UaeCardContent>
            <UaeCardFooter>
              <UaeButton variant="flag" size="sm">
                Learn More
                <ChevronRight className="h-4 w-4" />
              </UaeButton>
            </UaeCardFooter>
          </UaeCard>
        </div>
      </section>
      
      {/* Badge Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Badges</h2>
        <UaeDivider variant="gradient" />
        
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Desert Variant</p>
            <UaeBadge variant="desert">Desert</UaeBadge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Oasis Variant</p>
            <UaeBadge variant="oasis">Oasis</UaeBadge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Flag Variant</p>
            <UaeBadge variant="flag">Flag</UaeBadge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Gold Variant</p>
            <UaeBadge variant="gold">Gold</UaeBadge>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Outline Variant</p>
            <UaeBadge variant="outline">Outline</UaeBadge>
          </div>
        </div>
      </section>
      
      {/* Alert Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Alerts</h2>
        <UaeDivider variant="gradient" />
        
        <div className="space-y-4">
          <UaeAlert variant="desert">
            <Info className="h-4 w-4" />
            <UaeAlertTitle>Desert Alert</UaeAlertTitle>
            <UaeAlertDescription>
              An alert with UAE desert styling.
            </UaeAlertDescription>
          </UaeAlert>
          
          <UaeAlert variant="oasis">
            <CheckCircle className="h-4 w-4" />
            <UaeAlertTitle>Oasis Alert</UaeAlertTitle>
            <UaeAlertDescription>
              An alert with UAE oasis styling.
            </UaeAlertDescription>
          </UaeAlert>
          
          <UaeAlert variant="warning" decoration="pattern">
            <AlertTriangle className="h-4 w-4" />
            <UaeAlertTitle>Warning Alert</UaeAlertTitle>
            <UaeAlertDescription>
              A warning alert with decorative pattern.
            </UaeAlertDescription>
          </UaeAlert>
        </div>
      </section>
      
      {/* Divider Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Dividers</h2>
        <UaeDivider variant="gradient" />
        
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-sm font-medium">Gradient Divider</p>
            <UaeDivider variant="gradient" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Double Line Divider</p>
            <UaeDivider variant="double" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Dotted Divider</p>
            <UaeDivider variant="dotted" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Ornate Divider</p>
            <UaeDivider variant="ornate" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">With Symbol</p>
            <UaeDivider 
              variant="default" 
              withSymbol="center" 
              symbol={<Star className="h-4 w-4 text-emirati-desertGold" />} 
            />
          </div>
        </div>
      </section>
      
      {/* Stat Card Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Stat Cards</h2>
        <UaeDivider variant="gradient" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UaeStatCard
            variant="desert"
            title="Total Users"
            value="1,234"
            change="+12.3%"
            trend="up"
            icon={<User className="h-8 w-8 text-emirati-desertGold" />}
            description="Active platform users"
          />
          
          <UaeStatCard
            variant="oasis"
            title="Completed Courses"
            value="567"
            change="+8.7%"
            trend="up"
            icon={<CheckCircle className="h-8 w-8 text-emirati-oasisGreen" />}
            description="Courses completed this month"
          />
          
          <UaeStatCard
            variant="default"
            title="Open Positions"
            value="89"
            change="-5.2%"
            trend="down"
            icon={<Briefcase className="h-8 w-8 text-blue-500" />}
            description="Available job openings"
          />
          
          <UaeStatCard
            variant="flag"
            title="New Applications"
            value="342"
            change="+19.6%"
            trend="up"
            icon={<Flag className="h-8 w-8 text-red-500" />}
            description="Applications received"
          />
        </div>
      </section>
      
      {/* Decorative Container Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-serif text-emirati-deepBrown">Decorative Containers</h2>
        <UaeDivider variant="gradient" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <UaeDecoContainer 
            variant="desert" 
            decoration="corners"
          >
            <h3 className="text-lg font-medium mb-2">Container with Corners</h3>
            <p>A container with decorative corners inspired by UAE patterns.</p>
          </UaeDecoContainer>
          
          <UaeDecoContainer 
            variant="oasis" 
            decoration="pattern"
            patternUrl="https://www.transparenttextures.com/patterns/arabesque.png"
          >
            <h3 className="text-lg font-medium mb-2">Container with Pattern</h3>
            <p>A container with subtle arabesque pattern inspired by Islamic art.</p>
          </UaeDecoContainer>
        </div>
      </section>
    </div>
  );
};

export default UaeComponentsShowcase;
