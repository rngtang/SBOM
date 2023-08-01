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
      @sbom = Sbom.find(sbom_id)
      dependencies = @sbom.dependencies

      # The root_ref is the name of the root node
      @meta = Metadatum.find_by(sbom_id: params[:sbom_id])
      root_ref = @meta.rootNode
      tree = build_dependency_tree(dependencies, root_ref)

      render json: tree
    end


def build_dependency_tree(dependencies, root_ref)
# Initialize the tree with the modified name
formatted_name = root_ref.gsub(/pkg:(npm|application)\//, "")
tree = {"name" => formatted_name, "children" => []}

# Find the matching dependency
matching_dep = dependencies.find { |dep| dep["ref"] == root_ref }

if matching_dep
  # For each dependency that this dependency depends on
  matching_dep["dependsOn"].each do |ref|
    # Check if this dependency is in the original dependencies list
    dep = dependencies.find { |dep| dep["ref"] == ref }
    if dep
      # If it is, recursively build its tree
      tree["children"].push(build_dependency_tree(dependencies, ref))
    else
      # If it's not found, add a null end node with the modified name
      tree["children"].push({"name" => ref.gsub(/pkg:(npm|application)\//, "").gsub(/@\d+.\d+.\d+/, ""), "children" => []})
    end
  end
end

tree
end


end
