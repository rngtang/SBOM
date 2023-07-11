class DependenciesController < ApplicationController
    protect_from_forgery with: :null_session

    def new
        @dependency = Dependency.new
    end

    def create
        @sbom = Sbom.find(params[:sbom_id])
        @dependency = @sbom.dependencies.new(dependency_params)
        # respond_to do |format|
        #     if @dependency.save
        #         format.json { render json: @dependency}
        #     else
        #         format.json { head :no_content}
        #     end
        # end
    end

    def index
        @sbom = Sbom.find(params[:sbom_id])
        @dependencies = @sbom.dependencies
        render json: @dependencies, status: :ok
    end

    def show
        @dependency = Dependency.find(params[:id])
        render json: @dependencies, status: :ok
    end

    def tree
        @dependency = Dependency.find(params[:id])
        dependenciesArray = @dependency.dependsOn
        @newdependency = Dependency.where(ref: dependenciesArray, sbom_id: @dependency.sbom_id)
        render json: @newdependency, status: :ok
    end

    def dependency_params
        params.permit(:ref, dependsOn: [])
    end

    def dependencies_tree
        sbom_id = params[:sbom_id]
        sbom = Sbom.find(sbom_id)
        dependencies = sbom.dependencies
        
        # Assume the first dependency is the root of the tree
        root_ref = dependencies.first.ref
        tree = build_dependency_tree(dependencies, root_ref)

        render json: tree
    end

    private

    def build_dependency_tree(dependencies, root_ref)
        tree = {"name" => root_ref, "children" => []}
      
            
        dependencies.each do |dependency|
          if dependency["ref"] == root_ref  # Check if this dependency is the root_ref
            # For each dependency that this dependency depends on
            dependency["dependsOn"].each do |ref|
              # Check if this dependency is in the original dependencies list
              if dependencies.any? { |dep| dep["ref"] == ref }
                # If it is, recursively build its tree
                tree["children"].push(build_dependency_tree(dependencies, ref))
              end
            end
          end
        end
      
        tree
      
    end

end