class VulnerabilitiesController < ApplicationController
    
    def new
        @vulnerability = Vulnerability.new
    end

    # Looks for the sbom id and creates a vulnerability associated to the sbom
    def create
        @sbom = Sbom.find(params[:sbom_id])
        @vulnerability = @sbom.vulnerabilities.new(vulnerability_params)
    end

    # Looks for a vulnerability either through the unique vulnID or the sbom_id to which is associated
    def index
        if params[:vulnID]
          @vulnerabilities = Vulnerability.where(vulnID: params[:vulnID])
          render json: @vulnerabilities, status: :ok
        elsif params[:sbom_id]
          @sbom = Sbom.find(params[:sbom_id])
          render json: @sbom.vulnerabilities, status: :ok
        else 
          render json: Vulnerability.all, status: :ok
        end
    end

    def vulnaffected
      @sbom = Sbom.find(params[:sbom_id])
      @vulnerabilities = @sbom.vulnerabilities
      @affected = [];
      for vuln in @vulnerabilities do
        for i in vuln.affected do
          @affected << i
        end
      end 
      render json: @affected, status: :ok
    end

    # Renders to show a vulnerability
    def show
        @vulnerability = Vulnerability.find(params[:id])
        render json: @vulnerability, status: :ok
    end

    # Defines parameters in a vulnerability
    def vulnerability_params
        params.permit(:bom_ref, :vulnID, :description, :recommendation, affected: [])
    end
    
    def vuln_trace
      @vulns = Sbom.find(params[:sbom_id]).vulnerabilities
      @dependencies = Sbom.find(params[:sbom_id]).dependencies
      trace = {}
      for vuln in @vulns
        trace[vuln.id] = build_vuln_trace(@dependencies, vuln.affected[0])
      end
      render json: trace, status: :ok
    end


    def build_vuln_trace(dependencies, pkg)
      pkg = pkg.gsub(/pkg:(npm|application)\//, "")
      pkg = pkg[/[^@]+/]
      trace = []
      matching_ref = ""
      for dpd in dependencies
        for r in dpd.dependsOn
          r=r.gsub(/@\d.*$/, "")
          if r.ends_with?("/" + pkg) or r.ends_with?("/@" + pkg)
            trace << dpd.ref
          end
        end
      end
      trace
    end


end

# an attempt was made to create a function with a full trace, following the line of dependencies which contain the affected package
# below is the recursive function attempt

# def vuln_trace
#   @vuln = Vulnerability.find(params[:id]).affected[0]
#   @dependencies = Sbom.find(params[:sbom_id]).dependencies
#   trace = build_vuln_trace(@dependencies, @vuln)
#   render json: trace, status: :ok
# end


# def build_vuln_trace(dependencies, pkg)
#   # removes extra string and version number from pkg, as these often cause false mismatches
#   pkg = pkg.gsub(/pkg:(npm|application)\//, "")
#   pkg = pkg[/[^@]+/]
#   # puts pkg
#   # pkg = pkg[\/$]
#   # creates object to store the name of package we are looking for and any dependencies it appears in
#   trace = {name => pkg, children => []}
#   # loops through all dependencies
#   for dpd in dependencies
#     for r in dpd.dependsOn
#       # removes version number from pkg in dependsOn to remove possibility of false mismatch
#       r=r.gsub(/@\d.*$/, "")
#       # loops through the list of pkgs that dependency depends on and checks if that pkg ends with the name of the pkg we are looking for
#       # specifically looks for the name of the pkg with a "/" or "/@" to avoid possibility of false match
#       if r.ends_with?("/" + pkg) or r.ends_with?("/@" + pkg)
#         # r.endsin (/pkg or /@pkg)
#         # puts r
#         # puts pkg
#         # puts dpd.ref
#         # puts ""
#         # if it does match, now look for this package in dependencies and continue building tree off of that
#         trace[children].push(build_vuln_trace(dependencies, dpd.ref))
#       end
#     end
#   end
#   # return the tree
#   trace
# end


# it worked for some vulnerabilities, however occasionally it will create a loop and find a package inside a package we have already found before, therefore a endless recursive loop
# good luck for whoever touches this next